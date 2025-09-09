const express = require('express');
const { getData_controller } = require('../controller/product_controller');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();
router.get('/getData', authenticateToken, getData_controller)

module.exports = router;