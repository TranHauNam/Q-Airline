const Admin = require("../models/admin.model");
const jwt = require('jsonwebtoken');

module.exports.checkSuperAdmin = async (req, res, next) => {
  try {
    console.log('Checking super admin permissions');
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);
    
    const token = req.cookies.adminToken || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        message: "Không tìm thấy token xác thực!"
      });
    }

    console.log('Token found:', token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    const admin = await Admin.findById(decoded.id);
    console.log('Found admin:', admin);

    if (!admin) {
      return res.status(401).json({
        message: "Admin không tồn tại!"
      });
    }

    if (admin.role !== 'superadmin') {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập!"
      });
    }

    req.admin = admin;
    next();

  } catch (error) {
    console.error("Check super admin error:", error);
    return res.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn!",
      error: error.message
    });
  }
};