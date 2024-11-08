const User = require("../../models/user.model");
const md5 = require("md5");
const jwt = require('jsonwebtoken');

// module.exports.register = (req, res) => {
//     res.json({
//         message: "Register page"
//     }); 
// };

module.exports.registerPost = async (req, res) => {
    try {
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false
        });

        console.log(existEmail);

        if (existEmail) {
            return res.status(400).json({
                message: "Email đã tồn tại!"
            });
        }

        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        console.log(user);
        await user.save();

        res.status(201).json({
            message: "Đăng ký thành công",
            user: {
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Register error:", error); // Thêm log để debug
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

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = md5(password);

        const user = await User.findOne({
            email,
            password: hashedPassword,
            deleted: false,
            status: "active"
        });

        if (!user) {
            return res.status(401).json({ 
                message: "Email hoặc mật khẩu không đúng" 
            });
        }

        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email 
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: "Đăng nhập thành công",
            token: token,
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