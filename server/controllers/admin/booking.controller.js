const Booking = require('../../models/booking.model');
const Flight = require('../../models/flight.model');

module.exports.getBookingStatistics = async (req, res) => {
    try {
        // Thống kê tổng số đặt vé
        const totalBookings = await Booking.countDocuments();

        // Thống kê theo loại hạng ghế
        const bookingsByClass = await Booking.aggregate([
            {
                $group: {
                    _id: "$classType",
                    count: { $sum: 1 },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            }
        ]);

        // Thống kê theo tháng trong năm hiện tại
        const currentYear = new Date().getFullYear();
        const monthlyBookings = await Booking.aggregate([
            {
                $match: {
                    bookingDate: {
                        $gte: new Date(currentYear, 0, 1),
                        $lte: new Date(currentYear, 11, 31)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$bookingDate" },
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalPrice" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Thống kê các chuyến bay
        const flightTypeStats = await Flight.aggregate([
            {
                $group: {
                    _id: {
                        origin: "$origin",
                        destination: "$destination"
                    },
                    count: { $sum: 1 },
                    flights: {
                        $push: {
                            flightNumber: "$flightNumber",
                            departureTime: "$departureTime",
                            duration: "$duration"
                        }
                    }
                }
            },
            { 
                $sort: { 
                    "_id.origin": 1,
                    "_id.destination": 1 
                } 
            }
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalBookings,
                bookingsByClass,
                monthlyBookings,
                flightTypeStats
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Lỗi khi lấy thống kê",
            error: error.message
        });
    }
};
