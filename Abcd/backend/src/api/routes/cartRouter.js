const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');

router.post('/cart', authenticateToken, cartController.addToCart);
router.get('/cart', authenticateToken, cartController.getCartItems);
router.put('/cart/:itemId',authenticateToken, cartController.updateCartItemQuantity);
router.delete('/cart/:itemId',authenticateToken, cartController.removeCartItem);

module.exports = router;