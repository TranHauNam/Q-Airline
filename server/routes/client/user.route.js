const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");

router.post('/register', validate.register, controller.register);
router.post('/login', validate.login, controller.login);

module.exports = router;