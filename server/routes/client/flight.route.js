const express = require('express');
const route = express.Router();

const controller = require('../../controllers/client/flight.controller');

route.get('/all', controller.getAllFlights);
route.get('/single/:flightNumber', controller.getSingleFlight);
route.post('/search', controller.searchFlight);

module.exports = route;