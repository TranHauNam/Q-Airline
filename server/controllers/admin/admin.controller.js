const Admin = require("../../models/admin.model");
const ForgotPassword = require("../../models/forgot-password.model");

const md5 = require("md5");
const generate = require("../../helpers/generate");
const jwt = require('jsonwebtoken');

// [POST] /api/admin/acount/create
module.exports.create = async (req, res) => {
    try {
        console.log('Received create admin request:', req.body);
        
        const existEmail = await Admin.findOne({
            email: req.body.email,
            deleted: false
        });

        if (existEmail) {
            return res.status(400).json({
                message: "Email already exists!"
            });
        }

        const adminData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            phone: req.body.phone,
            role: req.body.role,
            status: 'active'
        };

        const admin = new Admin(adminData);
        await admin.save();

        console.log('Created admin:', admin);

        res.status(200).json({
            success: true,
            message: "Admin account created successfully",
            admin: {
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Create admin error:", error);
        res.status(500).json({ 
            success: false,
            message: "An error occurred while creating an admin account.",
            error: error.message 
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
                message: "Email does not exist!" 
            });
        }
        if (hashedPassword != admin.password) {
            return res.status(401).json({ 
                message: "Wrong password!" 
            });
        }
        

        if (admin.status == "inactive") {
            return res.status(401).json({ 
                message: "Account is locked" 
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
            message: "Login successful",
            adminToken: adminToken,
            admin: {
                fullName: admin.fullName,
                email: admin.email
            }
        });
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// [POST] /api/admin/account/logout
module.exports.logout = async (req, res) => {
    try {
        // Xóa cookie
        res.clearCookie('adminToken', {
            path: '/',
            domain: 'localhost'
        });

        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            message: "An error occurred while logging out."
        });
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

// [GET] /api/admin/account/check-auth
module.exports.checkAuth = async (req, res) => {
  try {
    // Lấy token từ cookie
    const adminToken = req.cookies.adminToken;
    if (!adminToken) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token"
      });
    }

    // Verify token
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    
    // Tìm admin trong database
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin không tồn tại"
      });
    }

    // Trả về thông tin admin
    res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("Check auth error:", error);
    res.status(401).json({
      success: false,
      message: "Token không hợp lệ"
    });
  }
};
