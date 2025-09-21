const express = require('express');
const { get_auth_controller, register_controller, forgotPassword_controller, resetPass_controller } = require('../controller/user.controller');
const router = express.Router();

router.post('/login', get_auth_controller);
router.post('/register', register_controller);
router.post('/forgotPassword', forgotPassword_controller);
router.post('/resetPassword/:id', resetPass_controller);

module.exports = router;