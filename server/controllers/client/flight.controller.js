const Flight = require('../../models/flight.model');
const TemporarySearch = require('../../models/temporary-search-flight.model');

// [GET] /api/flight/all
module.exports.getAllFlights = async (req, res) => {
    try {
        const { flightNumber, origin, destination, minPrice, maxPrice, startTime, endTime } = req.query;

        const filter = {};

        if (flightNumber) {
            filter.flightNumber = { $regex: flightNumber, $options: 'i' };
        }

        if (origin) {
            filter.origin = { $regex: origin, $options: 'i' };
        }

        if (destination) {
            filter.destination = { $regex: destination, $options: 'i' };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        if (startTime || endTime) {
            filter.departureTime = {};
            if (startTime) filter.departureTime.$gte = new Date(startTime);
            if (endTime) filter.departureTime.$lte = new Date(endTime);
        }

        console.log(filter);
        
        const flights = await Flight.find(filter).populate('planeId');
        res.status(200).json({
            flights: flights
        });
    } catch (error) {
        console.log("Error getting all flights", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// [GET] /api/flight/single/:flightNumber
module.exports.getSingleFlight = async (req, res) => {
    try {
        const flightNumber = req.params.flightNumber;

        const flight = await Flight.findOne({ flightNumber: flightNumber }).populate('planeId');

        if(!flight) {
            return res.status(404).json({ message: 'Flight not found.' });
        }

        res.status(200).json({
            flightNumber: flight.flightNumber, 
            planeId: flight.planeId, 
            origin: flight.origin, 
            destination: flight.destination, 
            departureTime: flight.departureTime, 
            arrivalTime: flight.arrivalTime, 
            price: flight.price, 
            createAt: flight.createAt
        });
    } catch (error) {
        console.error("Error getting flight by number", error);

        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// [POST] /api/flight/search
module.exports.searchFlight = async (req, res) => {
    try {
        const {
            origin,
            destination,
            departureTime,
            returnTime,
            flightType,
            classType,
            adult,
            children,
            infant
        } = req.body;

        console.log('Search request body:', req.body);

        // Validate dữ liệu đầu vào
        if (!origin || !destination || !departureTime || !flightType || !classType) {
            console.log('Missing required fields:', {
                origin: !!origin,
                destination: !!destination,
                departureTime: !!departureTime,
                flightType: !!flightType,
                classType: !!classType
            });
            return res.status(400).json({
                message: 'Thiếu thông tin tìm kiếm'
            });
        }

        // Tạo filter cơ bản cho chuyến đi
        const departureFilter = {
            origin: origin,
            destination: destination
        };

        // Xử lý ngày đi
        const startDate = new Date(departureTime);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(departureTime);
        endDate.setHours(23, 59, 59, 999);

        departureFilter.departureTime = {
            $gte: startDate,
            $lte: endDate
        };

        console.log('Departure filter:', departureFilter);

        // Tìm chuyến đi
        let departureFlights = await Flight.find(departureFilter).lean();
        console.log('Found departure flights:', departureFlights);

        // Kiểm tra số ghế trống theo hạng vé
        const totalPassengers = Number(adult) + Number(children);
        departureFlights = departureFlights.filter(flight => {
            let availableSeats;
            switch(classType) {
                case 'Economy':
                    availableSeats = flight.availableSeatsEconomy;
                    flight.price = flight.priceEconomy;
                    break;
                case 'Premium Economy':
                    availableSeats = flight.availableSeatsPremiumEconomy;
                    flight.price = flight.pricePremiumEconomy;
                    break;
                case 'Business':
                    availableSeats = flight.availableSeatsBusiness;
                    flight.price = flight.priceBusiness;
                    break;
                case 'First':
                    availableSeats = flight.availableSeatsFirst;
                    flight.price = flight.priceFirst;
                    break;
                default:
                    availableSeats = flight.availableSeatsEconomy;
                    flight.price = flight.priceEconomy;
            }
            return availableSeats >= totalPassengers;
        });

        if (departureFlights.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy chuyến bay phù hợp'
            });
        }

        let returnFlights = [];
        // Nếu là round-trip, tìm thêm chuyến về
        if (flightType === 'round-trip' && returnTime) {
            const returnFilter = {
                origin: destination,
                destination: origin
            };

            const returnStartDate = new Date(returnTime);
            returnStartDate.setHours(0, 0, 0, 0);
            const returnEndDate = new Date(returnTime);
            returnEndDate.setHours(23, 59, 59, 999);

            returnFilter.departureTime = {
                $gte: returnStartDate,
                $lte: returnEndDate
            };

            console.log('Return filter:', returnFilter);
            
            returnFlights = await Flight.find(returnFilter).lean();
            console.log('Found return flights:', returnFlights);

            // Lọc chuyến về theo số ghế trống
            returnFlights = returnFlights.filter(flight => {
                let availableSeats;
                switch(classType) {
                    case 'Economy':
                        availableSeats = flight.availableSeatsEconomy;
                        flight.price = flight.priceEconomy;
                        break;
                    case 'Premium Economy':
                        availableSeats = flight.availableSeatsPremiumEconomy;
                        flight.price = flight.pricePremiumEconomy;
                        break;
                    case 'Business':
                        availableSeats = flight.availableSeatsBusiness;
                        flight.price = flight.priceBusiness;
                        break;
                    case 'First':
                        availableSeats = flight.availableSeatsFirst;
                        flight.price = flight.priceFirst;
                        break;
                    default:
                        availableSeats = flight.availableSeatsEconomy;
                        flight.price = flight.priceEconomy;
                }
                return availableSeats >= totalPassengers;
            });

            if (returnFlights.length === 0 && flightType === 'round-trip') {
                return res.status(404).json({
                    message: 'Không tìm thấy chuyến bay về phù hợp'
                });
            }
        }

        // Format kết quả trả về
        const results = {
            departureFlights: departureFlights.map(flight => ({
                ...flight,
                totalPrice: flight.price * (Number(adult) + Number(children) * 0.75 + Number(infant) * 0.1)
            })),
            returnFlights: returnFlights.map(flight => ({
                ...flight,
                totalPrice: flight.price * (Number(adult) + Number(children) * 0.75 + Number(infant) * 0.1)
            }))
        };

        console.log('Search results:', results);

        res.status(200).json({
            flights: results
        });

    } catch (error) {
        console.error("Error searching flights:", error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Hàm helper để lấy số ghế trống theo hạng vé
function getAvailableSeats(flight, classType) {
    switch (classType) {
        case 'Economy':
            return flight.availableSeatsEconomy || 0;
        case 'Premium Economy':
            return flight.availableSeatsPremiumEconomy || 0;
        case 'Business':
            return flight.availableSeatsBusiness || 0;
        case 'First':
            return flight.availableSeatsFirst || 0;
        default:
            return 0;
    }
}