const Plane = require('../../models/plane.model');
const helpers = require('../../helpers/generateSeat')
// [POST] /api/admin/plane/add
module.exports.addPlane = async (req, res) => {
    try {
        const {code, manufacturer, economySeats, premiumEconomySeats, businessSeats, firstSeats} = req.body;
    
        // if(!code || !manufacturer) {
        //     return res.status(400).json({
        //         message: 'Please provide all the required fields: code, manufacturer'
        //     });
        // }
    
        const existPlane = await Plane.findOne({code: code});
    
        if(existPlane) {
            return res.status(400).json({
                message: 'Mã tàu bay đã tồn tại'
            });
        }
    
        const newPlane = await Plane.create({
            code: code, 
            manufacturer: manufacturer,
            economySeats: economySeats,
            premiumEconomySeats: premiumEconomySeats,
            businessSeats: businessSeats,
            firstSeats: firstSeats,
            seats: helpers.generateSeats(economySeats, premiumEconomySeats, businessSeats, firstSeats)
        });
    
        res.status(201).json({
            message: 'Thêm tàu bay thành công',
            plane: newPlane
        });
    } catch (error) {
        console.error("Lỗi thêm tàu bay:", error);

        res.status(500).json({
            message: 'Lỗi server',
            error: error.message
        });
    }
}

// [GET] /api/admin/plane/all
module.exports.getAllPlanes = async (req, res) => {
    try {
        const planes = await Plane.find({})
            .select('code manufacturer economySeats premiumEconomySeats businessSeats firstSeats')
            .sort({ code: 1 }); // Sắp xếp theo mã máy bay

        res.status(200).json({
            success: true,
            message: 'Lấy danh sách máy bay thành công',
            planes: planes
        });

    } catch (error) {
        console.error("Lỗi khi lấy danh sách máy bay:", error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách máy bay',
            error: error.message
        });
    }
};
