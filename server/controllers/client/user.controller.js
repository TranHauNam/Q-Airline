const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");

const md5 = require("md5");
const generate = require("../../helpers/generate");

// [POST] /api/user/register
module.exports.register = async (req, res) => {
    try {
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false
        });

        if (existEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại!"
            });
        }

        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        const token = generate.generateRandomString(20);
        user.token = token;
        await user.save();

        console.log(user.token);

        res.cookie("token", user.token, {
            httpOnly: true, // Cookie chỉ có thể được truy cập qua HTTP
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong môi trường sản xuất
            maxAge: 3600000 * 24 * 30 // Thời gian sống của cookie (30 ngày)
        });

        res.status(200).json({
            message: "Đăng ký thành công",
            token: user.token,
            user: {
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Register error:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Dữ liệu không hợp lệ" 
            });
        }
        res.status(500).json({ 
            message: "Có lỗi xảy ra, vui lòng thử lại sau" 
        });
    }
};

// [POST] /api/user/login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = md5(password);

        const user = await User.findOne({
            email: email,
            deleted: false
        });

        if (!user) {
            return res.status(401).json({ 
                message: "Email không tồn tại!" 
            });
        }

        if (hashedPassword != user.password) {
            return res.status(401).json({ 
                message: "Sai mật khẩu" 
            });
        }

        if (user.status == "inactive") {
            return res.status(401).json({ 
                message: "Tài khoản đang bị khóa" 
            });
        }

        res.cookie("token", user.token, {
            httpOnly: true, // Cookie chỉ có thể được truy cập qua HTTP
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong môi trường sản xuất
            maxAge: 3600000 * 24 * 30 // Thời gian sống của cookie (30 ngày)
        });

        res.status(200).json({
            message: "Đăng nhập thành công",
            token: user.token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// [POST] /api/user/logout
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");    
        res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau" });
    }
};

// [POST] /api/user/forgot-password
module.exports.forgotPassword = async (req, res) => {
    //Kiểm tra email
    const email = req.body.email;

    const user = await User.findOne({
       email: email,
       deleted: false 
    });

    if(!user) {
        return res.status(401).json({ 
            message: "Email không tồn tại!" 
        });
    }

    //Tạo mã OTP và lưu mã OTP và email vào collection forgot-password
    const OTP = generate.generateRandomOTP(6);
    const objectForgotPassword = {
        email: email,
        OTP: OTP,
        expireAt: Date.now()
    };

    console.log(objectForgotPassword);

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    res.status(200).json({
        message: "Gửi mã OTP lên database thành công"
    })
};

// [POST] /api/user/otp-verification
module.exports.otpVerification = async (req, res) => {
    try {
        const email = req.body.email;
        const OTP = req.body.OTP;

        const result = await ForgotPassword.findOne({
            email: email,
            OTP: OTP
        });

        const user = await User.findOne({
            email: email
        });
        const token = user.token;

        if(result) {
            res.cookie("token", token);
            res.status(200).json({
                message: "Thành công."
            });
        } else {
            return res.status(401).json({
                message: "Email hoặc mã OTP không đúng."
            });
        }
    } catch (error) {
        console.error("OTP Verification error:", error);
        res.status(500).json({
            message: "Có lỗi xảy ra, vui lòng thử lại sau"
        });
    }
};

// [POST] /api/user/reset-password
module.exports.resetPassword = async (req, res) => {
    const newPassword = req.body.newPassword;
    const hashedPassword = md5(newPassword);

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token không hợp lệ" });
    }

    await User.updateOne(
        {token: token},
        {password: hashedPassword}
    );
    res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
};
