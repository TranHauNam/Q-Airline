const express = require('express');
const route = express.Router();
const controller = require('../../controllers/client/post.controller');

route.get('/', controller.getPost);

module.exports = route;
