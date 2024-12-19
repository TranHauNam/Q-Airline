const express = require('express');

const route = express.Router();

const controller = require('../../controllers/admin/booking.controller');

//route.get('/', controller.getAllBookings);
route.get('/statistics', controller.getBookingStatistics);
module.exports = route;