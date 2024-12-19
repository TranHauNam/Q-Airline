const Admin = require("../../models/admin.model");
const ForgotPassword = require("../../models/forgot-password.model");

const md5 = require("md5");
const generate = require("../../helpers/generate");
const jwt = require('jsonwebtoken');

// [POST] /api/admin/acount/create
module.exports.create = async (req, res) => {
    try {
        const existEmail = await Admin.findOne({
            email: req.body.email,
            deleted: false
        });

        if (existEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại!"
            });
        }

        req.body.password = md5(req.body.password);
        const admin = new Admin(req.body);
        const adminToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        admin.adminToken = adminToken;
        await admin.save();

        console.log(admin);

        res.cookie("adminToken", admin.adminToken, {
            httpOnly: true, // Cookie chỉ có thể được truy cập qua HTTP
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS trong môi trường sản xuất
            maxAge: 3600000 * 24 * 30 // Thời gian sống của cookie (30 ngày)
        });

        res.status(200).json({
            message: "Đăng ký thành công",
            adminToken: admin.adminToken,
            admin: {
                fullName: admin.fullName,
                email: admin.email
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

// [POST] /api/admin/account/login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = md5(password);

        const admin = await Admin.findOne({
            email: email,
            deleted: false
        });

        if (!admin) {
            return res.status(401).json({ 
                message: "Email không tồn tại!" 
            });
        }
        if (hashedPassword != admin.password) {
            return res.status(401).json({ 
                message: "Sai mật khẩu" 
            });
        }
        

        if (admin.status == "inactive") {
            return res.status(401).json({ 
                message: "Tài khoản đang bị khóa" 
            });
        }
        
        const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        
        // Set cookie với domain và secure options
        res.cookie("adminToken", adminToken, {
            httpOnly: false, // Cho phép JavaScript truy cập cookie
            secure: false, // Tắt secure trong development
            sameSite: 'lax',
            maxAge: 86400000, // 24 hours
            path: '/',
            domain: 'localhost' // Thêm domain
        });

        res.status(200).json({
            message: "Đăng nhập thành công",
            adminToken: adminToken,
            admin: {
                fullName: admin.fullName,
                email: admin.email
            }
        });
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

// [POST] /api/admin/account/logout
module.exports.logout = async (req, res) => {
    try {
        res.clearCookie("adminToken");    
        res.status(200).json({ message: "Đăng xuất thành công" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại sau" });
    }
};

// // [POST] /api/user/forgot-password
// module.exports.forgotPassword = async (req, res) => {
//     //Kiểm tra email
//     const email = req.body.email;

//     const user = await User.findOne({
//        email: email,
//        deleted: false 
//     });

//     if(!user) {
//         return res.status(401).json({ 
//             message: "Email không tồn tại!" 
//         });
//     }

//     //Tạo mã OTP và lưu mã OTP và email vào collection forgot-password
//     const OTP = generate.generateRandomOTP(6);
//     const objectForgotPassword = {
//         email: email,
//         OTP: OTP,
//         expireAt: Date.now()
//     };

//     console.log(objectForgotPassword);

//     const forgotPassword = new ForgotPassword(objectForgotPassword);
//     await forgotPassword.save();
//     res.status(200).json({
//         message: "Gửi mã OTP lên database thành công"
//     })
// };

// // [POST] /api/user/otp-verification
// module.exports.otpVerification = async (req, res) => {
//     try {
//         const email = req.body.email;
//         const OTP = req.body.OTP;

//         const result = await ForgotPassword.findOne({
//             email: email,
//             OTP: OTP
//         });

//         const user = await User.findOne({
//             email: email
//         });
//         const token = user.token;

//         if(result) {
//             res.cookie("token", token);
//             res.status(200).json({
//                 message: "Thành công."
//             });
//         } else {
//             return res.status(401).json({
//                 message: "Email hoặc mã OTP không đúng."
//             });
//         }
//     } catch (error) {
//         console.error("OTP Verification error:", error);
//         res.status(500).json({
//             message: "Có lỗi xảy ra, vui lòng thử lại sau"
//         });
//     }
// };

// // [POST] /api/user/reset-password
// module.exports.resetPassword = async (req, res) => {
//     const newPassword = req.body.newPassword;
//     const hashedPassword = md5(newPassword);

//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({ message: "Token không hợp lệ" });
//     }

//     await User.updateOne(
//         {token: token},
//         {password: hashedPassword}
//     );
//     res.status(200).json({ message: "Cập nhật mật khẩu thành công" });
// };
