const mongoose = require("mongoose");
const genarate = require("../helpers/generate");

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,  
        password: String,
        token: {
            type: String,
            default: genarate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;  
