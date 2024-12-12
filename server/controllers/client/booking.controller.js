const Booking = require('../../models/booking.model');
const Flight = require('../../models/flight.model');
const User = require('../../models/user.model');

// [POST] /api/booking/
module.exports.bookFlight = async (req, res) => {
    try {
        const { flightId, passengerName, passengerEmail, passengerPhone, seatClass } = req.body;
        const userId = res.locals.user ? res.locals.user._id : null;

        const flight = await Flight.findById(flightId);
        const user = await User.findById(userId);

        if (!flight || flight.availableSeats <= 0) {
            return res.status(400).json({ message: 'Không còn chỗ trống!' });       
        }

        if (user.balance < flight.price) {
            return res.status(400).json({ message: 'Số tiền dư không đủ để đặt vé!' });
        }

        user.balance -= flight.price;
        await user.save();

        const newBooking = await Booking.create({
            userId: userId,
            flightId: flightId,
            passengerName: passengerName,
            passengerEmail: passengerEmail,
            passengerPhone: passengerPhone,
            seatClass: seatClass,
            status: 'Confirmed'
        });

        flight.availableSeats -= 1;
        await flight.save();

        res.status(201).json({
            message: 'Đặt vé thành công!',
            booking: newBooking,
            remainingBalance: user.balance
        });
    } catch (error) {
        console.error("Lỗi đặt vé:", error);
        res.status(500).json({ 
            message: 'Có lỗi xảy ra, vui lòng thử lại sau.' ,
            error: error.message
        });
    }
};

// [DELETE] /api/booking/cancel/:bookingId
module.exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);

        const userId = res.locals.user ? res.locals.user._id : null;
        const user = await User.findById(userId);

        const flight = await Flight.findById(booking.flightId);

        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy vé.' });
        }

        booking.status = 'Cancelled';
        await booking.save();

        user.balance += flight.price;
        await user.save();

        flight.availableSeats += 1; // Khôi phục chỗ ngồi
        await flight.save();

        res.status(200).json({ message: 'Hủy đặt vé thành công.' });
    } catch (error) {
        console.error("Lỗi hủy đặt vé:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};

// [GET] /api/booking/user/:userId
module.exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookings = await Booking.find({ userId: userId }).populate('flightId');

        res.status(200).json({
            message: 'Lấy thông tin đặt vé thành công.',
            bookings: bookings
        });
    } catch (error) {
        console.error("Lỗi lấy thông tin đặt vé:", error);
        res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    }
};