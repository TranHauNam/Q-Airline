const Post = require("../../models/post.model");

module.exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            posts
        });
    } catch (error) {
        console.log("Lỗi lấy bài đăng", error.message);
        res.status(500).json({
            message: "Lỗi server",
            error: error.message
        });
    }
}