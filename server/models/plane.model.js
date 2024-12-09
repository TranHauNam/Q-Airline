const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true
        }, 
        manufacturer: {
            type: String,
            required: true
        }, 
        seats: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Plane = mongoose.model('Plane', planeSchema, 'plane');

module.exports = Plane;