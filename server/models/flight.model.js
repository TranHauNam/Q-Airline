const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            unique: true
        },
        planeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plane',
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Flight = mongoose.model('Flight', flightSchema, 'flight');

module.exports = Flight;