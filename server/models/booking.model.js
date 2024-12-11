const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }, 
        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flight',
            required: true
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending'
        },
        seatClass: { 
            type: String, 
            enum: ['Economy', 'Business'], 
            default: 'Economy' 
        },
        passengerName: { 
            type: String, 
            required: true 
        },
        passengerEmail: { 
            type: String, 
            required: true 
        },
        passengerPhone: { 
            type: String, 
            required: true 
        },
        bookingDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Booking = mongoose.model('Booking', bookingSchema, 'booking');

module.exports = Booking;