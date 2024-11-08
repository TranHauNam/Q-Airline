module.exports.registerPost = (req, res, next) => {
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