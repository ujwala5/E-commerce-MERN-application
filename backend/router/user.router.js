const express = require('express');
const get_auth_controller = require('../controller/user.controller');
const router = express.Router();

router.post('/login', get_auth_controller);

module.exports = router;