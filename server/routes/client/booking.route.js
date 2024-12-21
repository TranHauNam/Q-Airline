const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/booking.controller');
//const userMiddleware = require('../../middlewares/user.middleware');

route.post('/', controller.bookFlight);
route.delete('/cancel/:bookingCode', controller.cancelBooking);
route.get('/user/:userId', controller.getUserBookings);

module.exports = route;