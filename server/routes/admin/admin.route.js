const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/admin.controller');

router.post('/account/login', controller.login);
router.post('/account/logout', controller.logout);

module.exports = router;