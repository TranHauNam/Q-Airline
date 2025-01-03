const Booking = require('../../models/booking.model');
const Flight = require('../../models/flight.model');
const User = require('../../models/user.model');
const TemporarySearch = require('../../models/temporary-search-flight.model');
const generateBookingCode = require('../../helpers/generateBookingCode');

// [POST] /api/booking/
module.exports.bookFlight = async (req, res) => {
    try {
        const { departureFlightNumber, 
                returnFlightNumber, 
                passengers, 
                departureSeatsRequested, 
                returnSeatsRequested, 
                paymentMethod, 
                extraBaggage, 
                specialMeal, 
                travelInsurance, 
                priorityBoarding,
                totalBase,
                addOnsTotals,
                taxes,
                totalPrice
              } = req.body;
        const userId = res.locals.user ? res.locals.user._id : null;
        
        if (!userId) {
            return res.status(401).json({ message: 'You must log in to book tickets.' });
        }

        const user = await User.findById(userId);

        const searched = await TemporarySearch.findOne({ userId: userId });
        if (!searched || !searched.flightData) {
            return res.status(404).json({ message: 'The search data is expired or does not exist.' });
        }
        console.log(searched);
        if (searched.flightType === 'one-way') {
            const flightSearched = searched.flightData.find(f => f.flightNumber === departureFlightNumber);
            //console.log(flightSearched);
            const classType = flightSearched.classType;
            const departureFlight = await Flight.findOne({flightNumber: departureFlightNumber});

            if (!departureFlight) {
                return res.status(400).json({ message: 'Flight not found!' });       
            }
        
            //Đánh dấu các ghế đã đặt
            const depatureSeatsToBook = [];
            //console.log(departureFlight);
            for (let i = 0; i < departureSeatsRequested.length; i++) {
                const seatNumber = departureSeatsRequested[i];
                const seatIndex = departureFlight.seats.findIndex(seat => {
                    return seat.seatNumber === seatNumber && seat.classType === classType && !seat.isBooked
                });
                if (seatIndex === -1) {
                    return res.status(400).json({
                        message: `Seat ${seatNumber} unavailable or booked.`,
                    });
                }

                // Đánh dấu ghế đã đặt
                departureFlight.seats[seatIndex].isBooked = true;
                depatureSeatsToBook.push(departureFlight.seats[seatIndex]);
            }

            const arrClassType = classType.split(' ');
            const srtClassType = arrClassType.join('');
            const seatField = `availableSeats${srtClassType}`;

            departureFlight[seatField] -= depatureSeatsToBook.length;
            await departureFlight.save();


            const bookingCode = generateBookingCode();

            //Tạo bản ghi đặt vé
            const booking = await Booking.create({
                bookingCode: bookingCode,
                userId: userId,
                passengers: passengers,
                classType: classType,
                totalPrice: totalPrice,
                departurePrivateInformation: {
                    seatsBooked: depatureSeatsToBook.map(seat => seat.seatNumber),
                    flightNumber: departureFlightNumber,
                    departureTime: departureFlight.departureTime,
                    origin: departureFlight.origin,
                    destination: departureFlight.destination
                },
                paymentMethod: paymentMethod,
                extraBaggage: extraBaggage,
                specialMeal: specialMeal,
                travelInsurance: travelInsurance,
                priorityBoarding: priorityBoarding,
                totalBase: totalBase,
                addOnsTotals: addOnsTotals,
                taxes: taxes,
                totalPrice: totalPrice
            });

            res.status(201).json({
                message: 'Booking successful!',
                booking: booking
            });
        } else if (searched.flightType === 'round-trip') {
            //console.log(searched.flightData);
            const flightSearched = searched.flightData.departure.find(f => f.flightNumber === departureFlightNumber);
            const classType = searched.flightData.classType;
            //console.log(classType);
            const departureFlight = await Flight.findOne({flightNumber: departureFlightNumber});
            if (!departureFlight) {
                return res.status(400).json({ message: 'Flight not found!' });       
            }

            //console.log(departureFlight);

            //Đánh dấu các ghế đã đặt
            const depatureSeatsToBook = [];
            for (let i = 0; i < departureSeatsRequested.length; i++) {
                const seatNumber = departureSeatsRequested[i];
                const seatIndex = departureFlight.seats.findIndex(seat => {
                    return seat.seatNumber === seatNumber && seat.classType === classType && !seat.isBooked
                });
                if (seatIndex === -1) {
                    return res.status(400).json({
                        message: `Seat ${seatNumber} unavailable or booked.`,
                    });
                }

                // Đánh dấu ghế đã đặt
                departureFlight.seats[seatIndex].isBooked = true;
                depatureSeatsToBook.push(departureFlight.seats[seatIndex]);
            }

            const arrClassType = classType.split(' ');
            const srtClassType = arrClassType.join('');
            const seatField = `availableSeats${srtClassType}`;

            departureFlight[seatField] -= depatureSeatsToBook.length;
            await departureFlight.save();

            const returnFlight = await Flight.findOne({flightNumber: returnFlightNumber});

            if (!returnFlight) {
                return res.status(400).json({ message: 'Flight not found!' });       
            }

            //Đánh dấu các ghế đã đặt
            const returnSeatsToBook = [];
            for (let i = 0; i < returnSeatsRequested.length; i++) {
                const seatNumber = returnSeatsRequested[i];
                const seatIndex = returnFlight.seats.findIndex(seat => {
                    return seat.seatNumber === seatNumber && seat.classType === classType && !seat.isBooked
                });
                if (seatIndex === -1) {
                    return res.status(400).json({
                        message: `Seat ${seatNumber} unavailable or booked.`,
                    });
                }

                // Đánh dấu ghế đã đặt
                returnFlight.seats[seatIndex].isBooked = true;
                returnSeatsToBook.push(returnFlight.seats[seatIndex]);
            }

            returnFlight[seatField] -= returnSeatsToBook.length;
            await returnFlight.save();

            const bookingCode = generateBookingCode();
            //Tạo bản ghi đặt vé
            const booking = await Booking.create({
                bookingCode: bookingCode,
                userId: userId,
                passengers: passengers,
                classType: classType,
                departurePrivateInformation: {
                    seatsBooked: depatureSeatsToBook.map(seat => seat.seatNumber),
                    flightNumber: departureFlightNumber,
                    departureTime: departureFlight.departureTime,
                    origin: departureFlight.origin,
                    destination: departureFlight.destination
                },
                returnPrivateInformation: {
                    seatsBooked: returnSeatsToBook.map(seat => seat.seatNumber),
                    flightNumber: returnFlightNumber,
                    departureTime: returnFlight.departureTime,
                    origin: returnFlight.origin,
                    destination: returnFlight.destination
                },
                departureFlight: departureFlight,
                returnFlight: returnFlight,
                totalBase: totalBase,
                addOnsTotals: addOnsTotals,
                taxes: taxes,
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                extraBaggage: extraBaggage,
                specialMeal: specialMeal,
                travelInsurance: travelInsurance,
                priorityBoarding: priorityBoarding,
            });

            res.status(201).json({
                message: 'Booking successful!',
                booking: booking
            });
        }
        
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ 
            message: 'An error occurred, please try again later.' ,
            error: error.message
        });
    }
};

// [POST] /api/booking/cancel/:bookingCode
module.exports.cancelBooking = async (req, res) => {
    try {
        const bookingCode = req.params.bookingCode;

        const booking = await Booking.findOne({bookingCode});
        if (!booking) {
            return res.status(404).json({ message: 'Ticket not found.' });
        }

        const userId = res.locals.user ? res.locals.user._id : null;
        const user = await User.findById(userId);

        // Tìm thông tin chuyến bay tương ứng
        const flight = await Flight.findOne({ flightNumber: booking.departurePrivateInformation.flightNumber });
        if (!flight) {
            return res.status(404).json({ message: 'No matching flight found.' });
        }

        // Kiểm tra thời gian hiện tại và thời gian khởi hành
        const currentTime = new Date();
        const cancelDeadline = new Date(flight.departureTime);
        cancelDeadline.setHours(cancelDeadline.getHours() - 12); // Giảm 12 tiếng

        if (currentTime > cancelDeadline) {
            return res.status(400).json({
                message: 'Cancellation deadline has passed (12 hours before departure time).'
            });
        }

        booking.bookingStatus = "Canceled";
        //console.log(booking);
        //await Booking.deleteOne({bookingCode: bookingCode});

        for (const seatNumber of booking.departurePrivateInformation.seatsBooked) {
            const seatIndex = flight.seats.findIndex(seat => 
                seat.seatNumber === seatNumber && seat.classType === booking.classType
            );
            if (seatIndex !== -1) {
                flight.seats[seatIndex].isBooked = false;
            }
        }
         // Nếu là vé khứ hồi, cập nhật cả ghế chuyến về
        if (booking.returnPrivateInformation,length) {
            const returnFlight = await Flight.findOne({ 
                flightNumber: booking.returnPrivateInformation.flightNumber 
            });
            
            if (returnFlight) {
                for (const seatNumber of booking.returnPrivateInformation.seatsBooked) {
                    const seatIndex = returnFlight.seats.findIndex(seat => 
                        seat.seatNumber === seatNumber && seat.classType === booking.classType
                    );
                    if (seatIndex !== -1) {
                        returnFlight.seats[seatIndex].isBooked = false;
                    }
                }
                await returnFlight.save();
            }
        }
        const arrClassType = booking.classType.split(' ');
        const srtClassType = arrClassType.join('');
        const seatField = `availableSeats${srtClassType}`;

        flight[seatField] = flight[seatField] + booking.departurePrivateInformation.seatsBooked.length + booking.returnPrivateInformation.seatsBooked.length;
        await flight.save();
        await booking.save();

        res.status(200).json({
            message: 'Ticket cancellation successful.',
            // bookings: {
            //     bookingCode: bookingCode,
            //     flightNumber: booking.departurePrivateInformation.flightNumber,
            //     status: booking.bookingStatus,
            //     totalPrice: booking.totalPrice,
            // }
            booking: booking
        });
    } catch (error) {
        console.error("Error canceling ticket:", error);
        res.status(500).json({ message: 'An error occurred, please try again later.' });
    }
};

// [GET] /api/booking/user/:userId
module.exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId: userId });

        res.status(200).json({
            message: 'Get ticket booking information successfully.',
            bookings: bookings
        });
    } catch (error) {
        console.error("Error retrieving booking information:", error);
        res.status(500).json({ message: 'An error occurred, please try again later.' });
    }
};