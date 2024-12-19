const Post = require('../../models/post.model');

// [POST] /api/admin/post
module.exports.createPost = async (req, res) => {
    try {
        const {title, content, postType, image} = req.body;
        
        // if(!title || !content) {
        //     return res.status(400).json({
        //         message: "Tiêu đề và nội dung bài viết không được để trống!"
        //     });
        // }

        const newPost = await Post.create({
            title: title,
            content: content,
            postType: postType,
            image: image
        });

        res.status(201).json({
            message: "Tạo bài viết thành công!",
            post: newPost
        });
    } catch (error) {
        console.error("Lỗi tạo bài viết:", error);
        res.status(500).json({
            message: "Lỗi tạo bài viết",
            error: error.message
        });
    }
}