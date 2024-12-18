const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

module.exports.verifyToken = (req, res, next) => {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
        return res.status(401).json({ message: "Bạn cần đăng nhập!" });
    }

    jwt.verify(adminToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token không hợp lệ!" });
        }
        const admin = await Admin.findById(decoded.id);
        res.locals.admin = admin;
        next();
    });
};