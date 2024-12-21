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
                $addFields: {
                    bookingDateAsDate: { 
                        $toDate: "$bookingDate" 
                    }
                }
            },
            {
                $match: {
                    $expr: {
                        $eq: [{ $year: "$bookingDateAsDate" }, currentYear]
                    }
                }
            },
            {
                $group: {
                    _id: { 
                        month: { $month: "$bookingDateAsDate" },
                        year: { $year: "$bookingDateAsDate" }
                    },
                    count: { $sum: 1 },
                    revenue: { $sum: "$totalPrice" },
                }
            },
            {
                $project: {
                    _id: "$_id.month",
                    year: "$_id.year",
                    count: 1,
                    revenue: 1,
                }
            },
            { 
                $sort: { _id: 1 } 
            },
            {
                $group: {
                    _id: null,
                    months: {
                        $push: {
                            month: "$_id",
                            count: "$count",
                            revenue: "$revenue",
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    months: {
                        $map: {
                            input: { $range: [1, 13] },
                            as: "month",
                            in: {
                                $let: {
                                    vars: {
                                        monthData: {
                                            $filter: {
                                                input: "$months",
                                                as: "m",
                                                cond: { $eq: ["$$m.month", "$$month"] }
                                            }
                                        }
                                    },
                                    in: {
                                        month: "$$month",
                                        count: { 
                                            $ifNull: [{ $arrayElemAt: ["$$monthData.count", 0] }, 0] 
                                        },
                                        revenue: { 
                                            $ifNull: [{ $arrayElemAt: ["$$monthData.revenue", 0] }, 0] 
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
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
            message: "Success statistics",
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
            message: "Error getting statistics",
            error: error.message
        });
    }
};