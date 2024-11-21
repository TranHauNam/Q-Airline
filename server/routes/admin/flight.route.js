const express = require('express');
const route = express.Router();

const controller = require('../../controllers/admin/flight.controller');

route.post('/add-flight', controller.addFlight);
route.put('/put-flight', controller.putFlight);
route.delete('/delete-flight', controller.deleteFlight);