const Flight = require('../../models/flight.model');
const TemporarySearch = require('../../models/temporary-search-flight.model');
const calculateArrivalTime = require('../../helpers/caculateArrivalTime')

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


//[GET] /api/flight/search
module.exports.searchFlight = async (req, res) => {
    try {
        const {origin, destination, departureTime, returnTime, flightType, classType, adult, children, infant} = req.query; 

        // Xóa các bản ghi cũ của người dùng
        await TemporarySearch.deleteMany({});

        const departureFilter = {
            origin: { $regex: origin, $options: 'i' },
            destination: { $regex: destination, $options: 'i' },
        };
        const parsedDepartureTime = new Date(departureTime);
        const departureStart = new Date(parsedDepartureTime.setUTCHours(0, 0, 0, 0));
        const departureEnd = new Date(parsedDepartureTime.setUTCHours(23, 59, 59, 999));
        departureFilter.departureTime = { $gte: departureStart, $lte: departureEnd };

        const totalSeatsNeeded = (adult || 0) + (children || 0);

        // console.log(origin);
        const arrClassType = classType.split(' ');
        const strClassType = arrClassType.join('');

        const calculatePrice = (flight, strClassType, adult, children, infant) => {
            const priceField = `price${strClassType}`;
            const adultPrice = flight[priceField];
            const childPrice = adultPrice * 0.75;
            const infantPrice = adultPrice * 0.1;

            return (
                (adult || 0) * adultPrice +
                (children || 0) * childPrice +
                (infant || 0) * infantPrice
            );
        };

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
                return {
                    flightNumber: flight.flightNumber,
                    origin: flight.origin,
                    destination: flight.destination,
                    departureTime: new Date(flight.departureTime.getTime() - 7 * 60 * 60 * 1000),
                    duration: flight.duration,
                    arrivalTime: new Date(new Date(calculateArrivalTime(flight.departureTime, flight.duration)).getTime() - 7 * 60 * 60 * 1000),
                    priceEconomy: flight.priceEconomy,
                    priceBusiness: flight.priceBusiness,
                    pricePremiumEconomy: flight.pricePremiumEconomy,
                    priceFirst: flight.priceFirst,  
                    totalBasePrice: calculatePrice(flight, strClassType, adult, children, infant),
                    availableSeatsEconomy: flight.seats.filter(seat => seat.classType === "Economy" && !seat.isBooked).length,
                    availableSeatsPremiumEconomy: flight.seats.filter(seat => seat.classType === "Premium Economy" && !seat.isBooked).length,
                    availableSeatsBusiness: flight.seats.filter(seat => seat.classType === "Business" && !seat.isBooked).length,
                    availableSeatsFirst: flight.seats.filter(seat => seat.classType === "First" && !seat.isBooked).length,
                    classType: classType,
                    flightType: flightType,
                    seats: flight.seats
                };
            });
    
            // Lưu kết quả vào TemporaryBooking
            await TemporarySearch.create({
                userId: res.locals.user ? res.locals.user._id : null, 
                flightData: response,
                adult: adult,
                children: children,
                infant: infant,
                expiresAt: Date.now()
            });

            res.status(200).json({ flights: response });
        } else if (flightType == 'round-trip') {
            const returnFilter = {
                origin: { $regex: destination, $options: 'i' },
                destination: { $regex: origin, $options: 'i' },
            };

            const parsedReturnTime = new Date(returnTime);
            const returnStart = new Date(parsedReturnTime.setUTCHours(0, 0, 0, 0));
            const returnEnd = new Date(parsedReturnTime.setUTCHours(23, 59, 59, 999));
            returnFilter.departureTime = { $gte: returnStart, $lte: returnEnd };

            const departureFlights = await Flight.find(departureFilter);

            const returnFlights = await Flight.find(returnFilter);

            var availableDepartureFlights = departureFlights.filter(flight => {
                const availableSeatsField = `availableSeats${strClassType}`;
                return flight[availableSeatsField] >= totalSeatsNeeded;
            });

            availableDepartureFlights = availableDepartureFlights.map(flight => ({
                flightNumber: flight.flightNumber,
                origin: flight.origin,
                destination: flight.destination,
                departureTime: new Date(flight.departureTime.getTime() - 7 * 60 * 60 * 1000),
                duration: flight.duration,
                arrivalTime: new Date(new Date(calculateArrivalTime(flight.departureTime, flight.duration)).getTime() - 7 * 60 * 60 * 1000),
                priceEconomy: flight.priceEconomy,
                priceBusiness: flight.priceBusiness,
                pricePremiumEconomy: flight.pricePremiumEconomy,
                priceFirst: flight.priceFirst,
                //totalPrice: calculatePrice(flight, strClassType, adult, children, infant),
                availableSeatsEconomy: flight.seats.filter(seat => seat.classType === "Economy" && !seat.isBooked).length,
                availableSeatsPremiumEconomy: flight.seats.filter(seat => seat.classType === "Premium Economy" && !seat.isBooked).length,
                availableSeatsBusiness: flight.seats.filter(seat => seat.classType === "Business" && !seat.isBooked).length,
                availableSeatsFirst: flight.seats.filter(seat => seat.classType === "First" && !seat.isBooked).length,
                seats: flight.seats
            }));

            var availableReturnFlights = returnFlights.filter(flight => {
                const availableSeatsField = `availableSeats${strClassType}`;
                return flight[availableSeatsField] >= totalSeatsNeeded;
            });

            availableReturnFlights = availableReturnFlights.map(flight => ({
                flightNumber: flight.flightNumber,
                origin: flight.origin,
                destination: flight.destination,
                departureTime: new Date(flight.departureTime.getTime() - 7 * 60 * 60 * 1000),
                duration: flight.duration,
                arrivalTime: new Date(new Date(calculateArrivalTime(flight.departureTime, flight.duration)).getTime() - 7 * 60 * 60 * 1000),
                priceEconomy: flight.priceEconomy,
                priceBusiness: flight.priceBusiness,
                pricePremiumEconomy: flight.pricePremiumEconomy,
                priceFirst: flight.priceFirst,
                //totalPrice: calculatePrice(flight, strClassType, adult, children, infant),
                availableSeatsEconomy: flight.seats.filter(seat => seat.classType === "Economy" && !seat.isBooked).length,
                availableSeatsPremiumEconomy: flight.seats.filter(seat => seat.classType === "Premium Economy" && !seat.isBooked).length,
                availableSeatsBusiness: flight.seats.filter(seat => seat.classType === "Business" && !seat.isBooked).length,
                availableSeatsFirst: flight.seats.filter(seat => seat.classType === "First" && !seat.isBooked).length,
                seats: flight.seats
            }));

            if (availableDepartureFlights.length === 0 || availableReturnFlights.length === 0) {
                return res.status(404).json({
                    message: 'Không có chuyến bay phù hợp với yêu cầu của bạn.',
                });
            }

            // const response = availableDepartureFlights.flatMap(departureFlight => {
            //     return availableReturnFlights.map(returnFlight => {

            //         return {
            //             departure: {
            //                 flightNumber: departureFlight.flightNumber,
            //                 origin: departureFlight.origin,
            //                 destination: departureFlight.destination,
            //                 departureTime: new Date(departureFlight.departureTime.getTime() - 7 * 60 * 60 * 1000),
            //                 duration: departureFlight.duration,
            //                 arrivalTimeOfTrip: new Date(new Date(calculateArrivalTime(departureFlight.departureTime, departureFlight.duration)).getTime() - 7 * 60 * 60 * 1000),
            //                 priceEconomy: departureFlight.priceEconomy,
            //                 priceBusiness: departureFlight.priceBusiness,
            //                 pricePremiumEconomy: departureFlight.pricePremiumEconomy,
            //                 priceFirst: departureFlight.priceFirst,  
            //                 availableSeatsEconomy: departureFlight.seats.filter(seat => seat.classType === "Economy" && !seat.isBooked).length,
            //                 availableSeatsPremiumEconomy: departureFlight.seats.filter(seat => seat.classType === "Premium Economy" && !seat.isBooked).length,
            //                 availableSeatsBusiness: departureFlight.seats.filter(seat => seat.classType === "Business" && !seat.isBooked).length,
            //                 availableSeatsFirst: departureFlight.seats.filter(seat => seat.classType === "First" && !seat.isBooked).length,
            //                 seats: departureFlight.seats
            //             },
            //             return: {
            //                 flightNumber: returnFlight.flightNumber,
            //                 origin: returnFlight.origin,
            //                 destination: returnFlight.destination,
            //                 departureTime: new Date(returnFlight.departureTime.getTime() - 7 * 60 * 60 * 1000),
            //                 duration: returnFlight.duration,
            //                 arrivalTimeOfReturn: new Date(new Date(calculateArrivalTime(returnFlight.departureTime, returnFlight.duration)).getTime() - 7 * 60 * 60 * 1000),
            //                 priceEconomy: returnFlight.priceEconomy,
            //                 priceBusiness: returnFlight.priceBusiness,
            //                 pricePremiumEconomy: returnFlight.pricePremiumEconomy,
            //                 priceFirst: returnFlight.priceFirst,  
            //                 availableSeatsEconomy: returnFlight.seats.filter(seat => seat.classType === "Economy" && !seat.isBooked).length,
            //                 availableSeatsPremiumEconomy: returnFlight.seats.filter(seat => seat.classType === "Premium Economy" && !seat.isBooked).length,
            //                 availableSeatsBusiness: returnFlight.seats.filter(seat => seat.classType === "Business" && !seat.isBooked).length,
            //                 availableSeatsFirst: returnFlight.seats.filter(seat => seat.classType === "First" && !seat.isBooked).length,
            //                 seats: returnFlight.seats
            //             },
            //             totalPrice: calculatePrice(departureFlight, classType, adult, children, infant) +
            //                         calculatePrice(returnFlight, classType, adult, children, infant),
            //             classType: classType,
            //             flightType: flightType
            //         };
            //     });
            // });

            const response = {
                departure: availableDepartureFlights,
                return: availableReturnFlights,
                classType: classType,
                flightType: flightType,
                totalBasePrice: calculatePrice(departureFlight, classType, adult, children, infant) +
                            calculatePrice(returnFlight, classType, adult, children, infant)
            }
            // Lưu kết quả vào TemporaryBooking
            await TemporarySearch.create({
                userId: res.locals.user ? res.locals.user._id : null,
                flightData: response,
                adult: adult,
                children: children,
                infant: infant,
                expiresAt: Date.now()
            });

            res.status(200).json({ 
                flightData: response
            });
        }
    } catch (error) {
        console.error("Error searching flight", error);

        res.status(500).json({
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// [GET] /api/flight/:flightNumber/seats
// module.exports.getFlightSeats = async (req, res) => {
//     try {
//         const flightNumber = req.params.flightNumber;
//         const { classType } = req.query;

//         const flight = await Flight.findOne({ flightNumber: flightNumber });
        
//         if (!flight) {
//             return res.status(404).json({
//                 message: 'Không tìm thấy chuyến bay.'
//             });
//         }

//         // Lọc ghế theo hạng vé nếu có yêu cầu
//         let seats = flight.seats;
//         if (classType) {
//             seats = seats.filter(seat => seat.classType === classType);
//         }

//         // Tổ chức ghế thành ma trận để dễ hiển thị
//         const seatMap = organizeSeatMap(seats);

//         res.status(200).json({
//             message: 'Lấy thông tin ghế thành công',
//             flightNumber: flight.flightNumber,
//             seatMap: seatMap,
//             flightInfo: {
//                 origin: flight.origin,
//                 destination: flight.destination,
//                 departureTime: flight.departureTime,
//                 duration: flight.duration,
//                 availableSeats: {
//                     Economy: flight.availableSeatsEconomy,
//                     PremiumEconomy: flight.availableSeatsPremiumEconomy,
//                     Business: flight.availableSeatsBusiness,
//                     First: flight.availableSeatsFirst
//                 }
//             }
//         });

//     } catch (error) {
//         console.error("Lỗi lấy thông tin ghế:", error);
//         res.status(500).json({
//             message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
//             error: error.message
//         });
//     }
// };

// // Hàm hỗ trợ tổ chức ghế thành ma trận
// const organizeSeatMap = (seats) => {
//     // Tạo đối tượng để nhóm ghế theo hạng
//     const seatsByClass = {
//         'First': [],
//         'Business': [],
//         'Premium Economy': [],
//         'Economy': []
//     };

//     // Phân loại ghế theo hạng
//     seats.forEach(seat => {
//         seatsByClass[seat.classType].push({
//             seatNumber: seat.seatNumber,
//             isBooked: seat.isBooked
//         });
//     });

//     // Sắp xếp ghế theo số thứ tự
//     for (let classType in seatsByClass) {
//         seatsByClass[classType].sort((a, b) => {
//             // Giả sử số ghế có dạng "1A", "2B", etc.
//             const rowA = parseInt(a.seatNumber.match(/\d+/)[0]);
//             const rowB = parseInt(b.seatNumber.match(/\d+/)[0]);
//             if (rowA !== rowB) return rowA - rowB;
            
//             const colA = a.seatNumber.match(/[A-Z]+/)[0];
//             const colB = b.seatNumber.match(/[A-Z]+/)[0];
//             return colA.localeCompare(colB);
//         });
//     }

//     return seatsByClass;
// };