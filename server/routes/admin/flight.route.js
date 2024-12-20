const express = require('express');
const route = express.Router();

const controller = require('../../controllers/admin/flight.controller');

route.post('/add', controller.addFlight);
route.get('/all', controller.getAllFlights);
route.patch('/:flightNumber/departure-time', controller.changeDepartureTime);

module.exports = route;
