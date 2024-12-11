const Admin = require("../models/admin.model");

module.exports = async (req, res, next) => {
    try {
        const adminToken = req.cookies.adminToken;

        if (!adminToken) {
            return res.status(401).json({ message: "Bạn cần đăng nhập!" });
        }

        const admin = await Admin.findOne({ 
            adminToken: adminToken, 
            deleted: false 
        });

        if (!admin || admin.role !== 'superadmin') {
            return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }

        res.locals.admin = admin;
        next();
    } catch (error) {
        console.error("Error checking superadmin:", error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau." });
    }
};