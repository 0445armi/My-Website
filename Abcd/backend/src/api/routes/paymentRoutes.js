const express = require('express');
const router = express.Router();
const orderController = require('../controllers/paymentController');

router.post('/create-order', orderController.checkOut);

module.exports = router;