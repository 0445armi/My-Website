const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth'); 
const addressController = require('../controllers/addressController');

router.post('/address', authenticateToken, addressController.createAddress);
router.put('/address/:id', authenticateToken, addressController.updateAddress);
router.delete('/address/:id', authenticateToken, addressController.deleteAddress);
router.get('/address', authenticateToken, addressController.getAddress);

module.exports = router;