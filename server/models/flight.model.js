const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            unique: true
        },
        planeCode: {
            type: String,
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
        duration: {
            type: String,
            required: true
        },
        priceEconomy: {
            type: Number,
            required: true
        },
        pricePremiumEconomy: {
            type: Number,
            required: true
        },
        priceBusiness: {
            type: Number,
            required: true
        },
        priceFirst: {
            type: Number,
            required: true
        },
        availableSeatsEconomy: {
            type: Number,
            required: true
        },
        availableSeatsPremiumEconomy: {
            type: Number,
            required: true
        },
        availableSeatsBusiness: {
            type: Number,
            required: true
        },
        availableSeatsFirst: {
            type: Number,
            required: true
        },
        seats: [
            {
                seatNumber: {
                    type: String,
                    required: true
                },
                classType: {
                    type: String,
                    required: true,
                    enum: ['Economy', 'Premium Economy', 'Business', 'First']
                },
                isBooked: {
                    type: Boolean,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Flight = mongoose.model('Flight', flightSchema, 'flight');

module.exports = Flight;