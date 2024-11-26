const Post = require('../../models/admin/post.model');

module.exports.createPost = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;

        if(!title || !content) {
            return res.status(400).json({
                message: "Tiêu đề và nội dung bài viết không được để trống!"
            });
        }

        const newPost = await Post.create({
            title: title,
            content: content
        });

        res.status(201).json({
            message: "Tạo bài viết thành công!",
            post: newPost
        });
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({
            message: "Lỗi tạo bài viết",
            error: error.message
        });
    }
}