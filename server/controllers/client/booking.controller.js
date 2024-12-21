const Booking = require('../../models/booking.model');
const Flight = require('../../models/flight.model');
const User = require('../../models/user.model');
const TemporarySearch = require('../../models/temporary-search-flight.model');
const generateBookingCode = require('../../helpers/generateBookingCode');

// [POST] /api/booking/
module.exports.bookFlight = async (req, res) => {
    try {
        const { departureFlightNumber, returnFlightNumber, passengers, departureSeatsRequested, returnSeatsRequested, additionalService, paymenMethod  } = req.body;
        const userId = res.locals.user ? res.locals.user._id : null;
        
        if (!userId) {
            return res.status(401).json({ message: 'Bạn phải đăng nhập để đặt vé.' });
        }

        const user = await User.findById(userId);

        const searched = await TemporarySearch.findOne({ userId: userId });
        if (!searched || !searched.flightData) {
            return res.status(404).json({ message: 'Dữ liệu tìm kiếm đã hết hạn hoặc không tồn tại.' });
        }
        if (searched.flightData[0].flightType === 'one-way') {
            const flightSearched = searched.flightData.find(f => f.flightNumber === departureFlightNumber);
            //console.log(flightSearched);
            const classType = flightSearched.classType;
            const departureFlight = await Flight.findOne({flightNumber: departureFlightNumber});

            if (!departureFlight) {
                return res.status(400).json({ message: 'Không tìm thấy chuyến bay!' });       
            }
        
            //Đánh dấu các ghế đã đặt
            const depatureSeatsToBook = [];
            console.log(departureFlight);
            for (let i = 0; i < departureSeatsRequested.length; i++) {
                const seatNumber = departureSeatsRequested[i];
                const seatIndex = departureFlight.seats.findIndex(seat => {
                    return seat.seatNumber === seatNumber && seat.classType === classType && !seat.isBooked
                });
                if (seatIndex === -1) {
                    return res.status(400).json({
                        message: `Ghế ${seatNumber} không khả dụng hoặc đã được đặt.`,
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

            const totalPrice = flightSearched.totalBasePrice;

            switch (additionalService) {
                case "Extra Baggage":
                    totalPrice += 300000;
                    break;
                case "Special Meal":
                    totalPrice += 150000;
                    break;
                case "Travel Insurance":
                    totalPrice += 200000;
                    break;
                case "Priority Boarding":
                    totalPrice += 100000;
                    break;
                default:
                    break;
            }

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
                },
                additionalService: additionalService,
                paymenMethod: paymenMethod,
                departureFlight: departureFlight
            });

            res.status(201).json({
                message: 'Đặt vé thành công!',
                booking: booking
            });
        } else if (searched.flightData[0].flightType === 'round-trip') {
            console.log(searched.flightData);
            const flightSearched = searched.flightData.find(f => f.departure.flightNumber === departureFlightNumber);
            const classType = flightSearched.classType;
            const departureFlight = await Flight.findOne({flightNumber: departureFlightNumber});
            if (!departureFlight) {
                return res.status(400).json({ message: 'Không tìm thấy chuyến bay!' });       
            }

            //Đánh dấu các ghế đã đặt
            const depatureSeatsToBook = [];
            for (let i = 0; i < departureSeatsRequested.length; i++) {
                const seatNumber = departureSeatsRequested[i];
                const seatIndex = departureFlight.seats.findIndex(seat => {
                    return seat.seatNumber === seatNumber && seat.classType === classType && !seat.isBooked
                });
                if (seatIndex === -1) {
                    return res.status(400).json({
                        message: `Ghế ${seatNumber} không khả dụng hoặc đã được đặt.`,
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
                return res.status(400).json({ message: 'Không tìm thấy chuyến bay!' });       
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
                        message: `Ghế ${seatNumber} không khả dụng hoặc đã được đặt.`,
                    });
                }

                // Đánh dấu ghế đã đặt
                returnFlight.seats[seatIndex].isBooked = true;
                returnSeatsToBook.push(returnFlight.seats[seatIndex]);
            }

            returnFlight[seatField] -= returnSeatsToBook.length;
            await returnFlight.save();

            const totalPrice = flightSearched.totalPrice;

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
                    departureTime: departureFlightNumber.departureTime
                },
                returnPrivateInformation: {
                    seatsBooked: returnSeatsToBook.map(seat => seat.seatNumber),
                    flightNumber: returnFlightNumber,
                    departureTime: returnFlight.departureTime
                },
                departureFlight: departureFlight,
                returnFlight: returnFlight
            });

            res.status(201).json({
                message: 'Đặt vé thành công!',
                booking: booking
            });
        }
        
    } catch (error) {
        console.error("Lỗi đặt vé:", error);
        res.status(500).json({ 
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.' ,
            error: error.message
        });
    }
};

// [DELETE] /api/booking/cancel/:bookingCode
module.exports.cancelBooking = async (req, res) => {
    try {
        const bookingCode = req.params.bookingCode;

        const booking = await Booking.findOne({bookingCode});
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy vé.' });
        }

        const userId = res.locals.user ? res.locals.user._id : null;
        const user = await User.findById(userId);

        // Tìm thông tin chuyến bay tương ứng
        const flight = await Flight.findOne({ flightNumber: booking.flightNumber });
        if (!flight) {
            return res.status(404).json({ message: 'Không tìm thấy chuyến bay tương ứng.' });
        }

        // Kiểm tra thời gian hiện tại và thời gian khởi hành
        const currentTime = new Date();
        const cancelDeadline = new Date(flight.departureTime);
        cancelDeadline.setHours(cancelDeadline.getHours() - 12); // Giảm 12 tiếng

        if (currentTime > cancelDeadline) {
            return res.status(400).json({
                message: 'Đã quá thời hạn hủy vé (12 tiếng trước giờ khởi hành).'
            });
        }

        booking.status = "Canceled";
        await booking.save();
        //await Booking.deleteOne({bookingCode: bookingCode});

        const arrClassType = booking.classType.split(' ');
        const srtClassType = arrClassType.join('');
        const seatField = `availableSeats${srtClassType}`;

        flight[seatField] = booking.departurePrivateInformation.seatsBooked.length + booking.returnPrivateInformation.seatsBooked.length;
        await flight.save();

        res.status(200).json({
            message: 'Hủy vé thành công.',
            booking: {
                bookingCode: bookingCode,
                flightNumber: booking.flightNumber,
                status: booking.status,
                totalPrice: booking.totalPrice,
            }
        });
    } catch (error) {
        console.error("Lỗi hủy đặt vé:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};

// [GET] /api/booking/user/:userId
module.exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId: userId });

        res.status(200).json({
            message: 'Lấy thông tin đặt vé thành công.',
            bookings: bookings 
        });
    } catch (error) {
        console.error("Lỗi lấy thông tin đặt vé:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};