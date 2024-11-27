const Booking = require('../../models/admin/booking.model');

// [GET] /api/admin/booking/
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

//[GET] /api/admin/booking/statistics
module.exports.getBookingStatistics = async (req, res) => {
    try {
      const statistics = await Booking.aggregate([
        {
          $group: {
            _id: '$flightId',
            totalBookings: { $sum: 1 },
            totalSeatsBooked: { $sum: '$seatsBooked' }
          }
        },
        {
          $lookup: {
            from: 'flights',
            localField: '_id',
            foreignField: '_id',
            as: 'flightInfo'
          }
        },
        {
          $unwind: '$flightInfo'
        },
        {
          $project: {
            _id: 0,
            flightId: '$_id',
            flightNumber: '$flightInfo.flightNumber',
            origin: '$flightInfo.origin',
            destination: '$flightInfo.destination',
            departureTime: '$flightInfo.departureTime',
            totalBookings: 1,
            totalSeatsBooked: 1
          }
        }
      ]);
  
      res.status(200).json({
        message: 'Get booking statistics successfully.',
        statistics: statistics,
      });
    } catch (error) {
      console.error('Error fetching booking statistics:', error);
      res.status(500).json({
        message: 'Failed to fetch booking statistics.',
        error: error.message,
      });
    }
};