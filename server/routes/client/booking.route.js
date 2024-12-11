const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/booking.controller');
const userMiddleware = require('../../middlewares/user.middleware');

route.post('/', userMiddleware.infoUser, controller.bookFlight);
route.delete('/cancel/:bookingId', controller.cancelBooking)

module.exports = route;