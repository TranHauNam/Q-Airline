const Flight = require('../../models/flight.model');

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
        console.error("Error getting all flights", error);
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

// [GET] /api/flight/search
module.exports.searchFlight = async (req, res) => {
    try {
        const {origin, destination, departureTime, returnTime, flightType, classType, adult, children, infant} = req.body; 

        const departureFilter = {
            origin: { $regex: origin, $options: 'i' },
            destination: { $regex: destination, $options: 'i' },
        };
        const parsedDepartureTime = new Date(departureTime);
        const departureStart = new Date(parsedDepartureTime.setHours(0, 0, 0, 0));
        const departureEnd = new Date(parsedDepartureTime.setHours(23, 59, 59, 999));
        departureFilter.departureTime = { $gte: departureStart, $lte: departureEnd };

        const totalSeatsNeeded = (adult || 0) + (children || 0);

        const arrClassType = classType.split(' ');
        const strClassType = arrClassType.join('');

        if (flightType == 'one-way') {
            const flights = await Flight.find(departureFilter);
            const availableFlights = flights.filter(flight => {
                const availableSeatsField = `availableSeats${strClassType}`;
                return flight[availableSeatsField] >= totalSeatsNeeded;
            });

            if (availableFlights.length === 0) {
                return res.status(404).json({
                    message: 'Không có chuyến bay phù hợp với yêu cầu của bạn.',
                });
            }

            const response = availableFlights.map(flight => {
                const priceField = `price${strClassType}`;

                const adultPrice = flight[priceField];
                const childPrice = adultPrice * 0.75;
                const infantPrice = adultPrice * 0.1;
    
                const totalPrice =
                    (adult || 0) * adultPrice +
                    (children || 0) * childPrice +
                    (infant || 0) * infantPrice;
                
                return {
                    flightNumber: flight.flightNumber,
                    origin: flight.origin,
                    destination: flight.destination,
                    departureTime: flight.departureTime,
                    duration: flight.duration,  
                    price: totalPrice,
                    availableSeats: flight[`availableSeats${strClassType}`],
                    classType: classType,
                };
            });
    
            res.status(200).json({ flights: response });
        } else if (flightType == 'round-trip') {
            const returnFilter = {
                origin: { $regex: destination, $options: 'i' },
                destination: { $regex: origin, $options: 'i' },
            };

            const parsedReturnTime = new Date(returnTime);
            const returnStart = new Date(parsedReturnTime.setHours(0, 0, 0, 0));
            const returnEnd = new Date(parsedReturnTime.setHours(23, 59, 59, 999));
            returnFilter.departureTime = { $gte: returnStart, $lte: returnEnd };

            const departureFlights = await Flight.find(departureFilter);

            const returnFlights = await Flight.find(returnFilter);

            const availableDepartureFlights = departureFlights.filter(flight => {
                const availableSeatsField = `availableSeats${strClassType}`;
                return flight[availableSeatsField] >= totalSeatsNeeded;
            });

            const availableReturnFlights = returnFlights.filter(flight => {
                const availableSeatsField = `availableSeats${strClassType}`;
                return flight[availableSeatsField] >= totalSeatsNeeded;
            });

            if (availableDepartureFlights.length === 0 || availableReturnFlights.length === 0) {
                return res.status(404).json({
                    message: 'Không có chuyến bay phù hợp với yêu cầu của bạn.',
                });
            }

            const response = availableDepartureFlights.flatMap(departureFlight => {
                return availableReturnFlights.map(returnFlight => {
                    const priceField = `price${strClassType}`;

                    const adultPrice = departureFlight[priceField] + returnFlight[priceField];
                    const childPrice = adultPrice * 0.75; 
                    const infantPrice = adultPrice * 0.1;

                    const totalPrice =
                        (adult || 0) * adultPrice +
                        (children || 0) * childPrice +
                        (infant || 0) * infantPrice;

                    return {
                        departure: {
                            flightNumber: departureFlight.flightNumber,
                            origin: departureFlight.origin,
                            destination: departureFlight.destination,
                            departureTime: departureFlight.departureTime,
                            duration: departureFlight.duration,
                        },
                        return: {
                            flightNumber: returnFlight.flightNumber,
                            origin: returnFlight.origin,
                            destination: returnFlight.destination,
                            departureTime: returnFlight.departureTime,
                            duration: returnFlight.duration,
                        },
                        totalPrice,
                        classType,
                    };
                });
            });
            res.status(200).json({ flights: response });
        }
    } catch (error) {
        console.error("Error searching flight", error);

        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};