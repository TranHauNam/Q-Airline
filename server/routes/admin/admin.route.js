// const express = require('express');
// const router = express.Router();
// const controller = require('../../controllers/admin/admin.controller');

// router.post('/account/login', controller.login);
// router.post('/account/logout', controller.logout);

// module.exports = router;

const express = require('express');
const route = express.Router();
const controller = require('../../controllers/admin/admin.controller');
const checkSuperAdmin = require('../../middlewares/checkSuperAdmin.middleware');

route.post('/create', checkSuperAdmin, controller.create);
route.post('/login', controller.login);
route.post('/logout', controller.logout);

module.exports = route