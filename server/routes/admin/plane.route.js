const express = require('express');

const route = express.Router();

const controller = require('../../controllers/admin/plane.controller');

route.post('/add', controller.addPlane);
module.exports = route;