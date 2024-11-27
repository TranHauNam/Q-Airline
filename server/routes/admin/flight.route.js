const express = require('express');
const route = express.Router();

const controller = require('../../controllers/admin/flight.controller');

route.post('/add', controller.addFlight);
route.get('/', controller.getAllFlights);
route.patch('/:id/departure-time', controller.changeDepartureTime);

module.exports = route;