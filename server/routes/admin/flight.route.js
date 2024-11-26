const express = require('express');
const route = express.Router();

const controller = require('../../controllers/admin/flight.controller');

route.post('/add', controller.addFlight);
route.get('/', controller.getAllFlights);
route.patch('/change', controller.changeFlight);
route.delete('/delete', controller.deleteFlight);

module.exports = route;