const Post = require("../../models/post.model");

module.exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            posts
        });
    } catch (error) {
        console.log("Error getting post", error.message);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}