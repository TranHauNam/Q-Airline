const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        bookingCode: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        
        passengers: [
            {
                title: {
                    type: String,
                    required: true
                },
                firstName: {
                    type: String,
                    required: true
                },
                dateOfBirth: {
                    type: Date,
                    required: true
                },
                nationality: {
                    type: String,
                    required: true
                },
                passportNumber: {
                    type: String,
                    required: true
                },
                passportExpiry: {
                    type: Date,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                phone: {
                    type: String,
                    required: true
                }
            }
        ],
        bookingDate: {
            type: Date,
            default: Date.now
        },
        classType: {
            type: String,
            required: true,
            enum: ['Economy', 'Premium Economy', 'Business', 'First']
        },
        totalPrice: { 
            type: Number, 
            required: true,
            required: true
        },
        departurePrivateInformation: {
            seatsBooked: {
                type: [String],
                required: true
            },
            flightNumber: {
                type: String,
                ref: 'Flight',
                required: true
            }
        },
        returnPrivateInformation: {
            seatsBooked: {
                type: [String],
            },
            flightNumber: {
                type: String,
                ref: 'Flight',
            }
        }

    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model('Booking', bookingSchema, 'booking');

module.exports = Booking;
