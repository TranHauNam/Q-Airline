const User = require("../../models/user.model");

module.exports.register = (req, res, next) => {
    const errors = [];
    
    // Validate fullName
    if (!req.body.fullName) {
        errors.push("Họ tên không được để trống");
    } else if (req.body.fullName.length < 3) {
        errors.push("Họ tên phải có ít nhất 3 ký tự");
    }
    
    // Validate email
    if (!req.body.email) {
        errors.push("Email không được để trống");
    } else if (!validateEmail(req.body.email)) {
        errors.push("Email không hợp lệ");
    }
    
    // Validate password
    if (!req.body.password) {
        errors.push("Mật khẩu không được để trống");
    } else if (req.body.password.length < 6) {
        errors.push("Mật khẩu phải có ít nhất 6 ký tự");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0]
        });
    }
    
    next();
};

module.exports.login = (req, res, next) => {
    const errors = [];
    
    // Validate email
    if (!req.body.email) {
        errors.push("Email không được để trống");
    } else if (!validateEmail(req.body.email)) {
        errors.push("Email không hợp lệ");
    }
    
    // Validate password
    if (!req.body.password) {
        errors.push("Mật khẩu không được để trống");
    } else if (req.body.password.length < 6) {
        errors.push("Mật khẩu phải có ít nhất 6 ký tự");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0]
        });
    }
    
    next();
};

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

module.exports.forgotPassword = async (req, res, next) => {
    const errors = [];
    
    // Validate email
    if (!req.body.email) {
        errors.push("Email không được để trống");
    } else if (!validateEmail(req.body.email)) {
        errors.push("Email không hợp lệ");
    }
    
    // Kiểm tra xem email có tồn tại trong hệ thống hay không
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        errors.push("Email không tồn tại trong hệ thống");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0]
        });
    }
    
    next();
};

module.exports.resetPassword = (req, res, next) => {
    const errors = [];
    
    // Validate new password
    if (!req.body.newPassword) {
        errors.push("Mật khẩu mới không được để trống");
    } else if (req.body.newPassword.length < 6) {
        errors.push("Mật khẩu mới phải có ít nhất 6 ký tự");
    }
    
    // Validate confirm password
    if (!req.body.confirmPassword) {
        errors.push("Xác nhận mật khẩu không được để trống");
    } else if (req.body.newPassword !== req.body.confirmPassword) {
        errors.push("Mật khẩu mới và xác nhận mật khẩu không khớp");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0]
        });
    }
    
    next();
};

module.exports.otpVerification = async (req, res, next) => {
    const errors = [];
    
    // Validate email
    if (!req.body.email) {
        errors.push("Email không được để trống");
    } else if (!validateEmail(req.body.email)) {
        errors.push("Email không hợp lệ");
    }
    
    // Kiểm tra xem email có tồn tại trong hệ thống hay không
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        errors.push("Email không tồn tại trong hệ thống");
    }

    // Validate OTP
    if (!req.body.OTP) {
        errors.push("Mã OTP không được để trống");
    } else if (!/^\d{6}$/.test(req.body.OTP)) { // Giả sử mã OTP là 6 chữ số
        errors.push("Mã OTP không hợp lệ");
    }
    
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0]
        });
    }
    
    next();
};