const Booking = require('../../models/booking.model');
const Flight = require('../../models/flight.model');

// [POST] /api/booking/
module.exports.bookFlight = async (req, res) => {
    // try {
    //     const { flightNumber, passengerName, passengerEmail, passengerPhone, seatClass } = req.body;

    //     // if (!flightId || !passengerName || !passengerEmail || !passengerPhone) {
    //     //     return res.status(400).json({ message: 'Tất cả các trường đều là bắt buộc.' });
    //     // }

    //     const userId = res.locals.user ? res.locals.user._id : null;

    //     const flight = await Flight.find({flightNumber: flightNumber});

    //     if (flight.availableSeats <= 0) {
    //         return res.status(400).json({ message: 'Không còn chỗ trống!' });       
    //     }

    //     const newBooking = await Booking.create({
    //         userId: userId,
    //         flightId: flightId,
    //         passengerName: passengerName,
    //         passengerEmail: passengerEmail,
    //         passengerPhone: passengerPhone,
    //         seatClass: seatClass
    //     });

    //     flight.availableSeats -= 1;
    //     await flight.save();

    //     res.status(201).json({
    //         message: 'Đặt vé thành công!',
    //         booking: newBooking
    //     });
    // } catch (error) {
    //     console.error("Lỗi đặt vé:", error);
    //     res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau.' });
    // }
};

module.exports.cancelBooking = async (req, res) => {
    
};