const Booking = require('../../models/admin/booking.model');

module.exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .populate('userId', 'name email')
        .populate('flightId', 'flightNumber origin destination departureTime arrivalTime');

        res.status(200).json({
            message: 'Get all bookings successfully.',
            bookings: bookings,
        });
    } catch (error) {
        console.error('Error get all bookings:', error);
        res.status(500).json({
            message: 'Failed to get all bookings.',
            error: error.message,
        });
    }

    
};

module.exports.getBookingStatistics = async (req, res) => {
    
};