const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Bạn cần đăng nhập!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token không hợp lệ!" });
        }
        const user = await User.findById(decoded.id);
        res.locals.user = user;
        next();
    });
};