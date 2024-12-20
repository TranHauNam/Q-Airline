const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/admin.controller');
const { checkSuperAdmin } = require('../../middlewares/checkSuperAdmin.middleware');

route.post('/create', checkSuperAdmin, controller.create);
route.get('/check-auth', controller.checkAuth);
route.post('/login', controller.login);
route.post('/logout', controller.logout);

module.exports = route;