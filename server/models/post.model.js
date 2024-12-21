const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        postType: {
            type: String,
            enum: ['News', 'Promotion', 'Notification'],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema, 'post');

module.exports = Post;