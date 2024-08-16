const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { authenticateToken } = require('../middleware/auth');

router.post('/address',authenticateToken, addressController.createAddress);
router.get('/address', authenticateToken, addressController.getAddress);
router.put('/address/:id',authenticateToken, addressController.updateAddress);
router.delete('/address/:id',authenticateToken, addressController.deleteAddress);

module.exports = router;