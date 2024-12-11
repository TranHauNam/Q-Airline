const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,  
        password: String,
        adminToken: String,
        phone: String,
        avatar: String,
        role: {
            type: String,
            enum: ['admin', 'superadmin'],
            default: 'admin'
        },
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

const Admin = mongoose.model("Admin", adminSchema, "admin");

module.exports = Admin;  
