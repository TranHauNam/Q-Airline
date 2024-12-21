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
        economySeats: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value % 6 === 0,
                message: 'economySeats must be divisible by 6'
            }
        },
        premiumEconomySeats: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value % 6 === 0,
                message: 'premiumEconomy must be divisible by 6'
            }
        },
        businessSeats: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value % 4 === 0,
                message: 'businessSeats must be divisible by 4'
            }
        },
        firstSeats: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value % 4 === 0,
                message: 'firstSeats must be divisible by 4'
            }
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
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Plane = mongoose.model('Plane', planeSchema, 'plane');

module.exports = Plane;