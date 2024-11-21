const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");

router.post('/register', validate.register, controller.register);
router.post('/login', validate.login, controller.login);
router.post('/logout', controller.logout);
router.post('/forgot-password', validate.forgotPassword, controller.forgotPassword);
router.post('/otp-verification', validate.otpVerification, controller.otpVerification);
router.post('/reset-password', validate.resetPassword, controller.resetPassword);

module.exports = router;