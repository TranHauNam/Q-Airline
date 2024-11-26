const express = require('express');

const route = express.Router();

const controller = require('../../controllers/admin/post.controller');

route.post('/', controller.createPost);
module.exports = route;