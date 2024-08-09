const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const addressController = require('../controllers/addressController');
const upload = require('../../utils/file_upload');
const authenticateToken = require('../middlewares/auth'); 

router.post('/register', userController.register);
router.post('/login', userController.login);

//Product Router
router.post('/products', authenticateToken, upload.single('image'), userController.createProduct);
router.put('/products/:id', authenticateToken, upload.single('image'), userController.updateProduct);
router.delete('/products/:id', authenticateToken, userController.deleteProduct);
router.get('/products',authenticateToken, userController.getProducts);

//Address Router
router.post('/address', authenticateToken, addressController.createAddress);
router.put('/address/:id', authenticateToken, addressController.updateAddress);
router.delete('/address/:id', authenticateToken, addressController.deleteAddress);
router.get('/address', authenticateToken, addressController.getAddress);

module.exports = router;
