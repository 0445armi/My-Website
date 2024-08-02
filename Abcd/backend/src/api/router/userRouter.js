const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../../utils/file_upload');
const authenticateToken = require('../middlewares/auth'); 

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/products', authenticateToken, upload.single('image'), userController.createProduct);
router.put('/products/:id', authenticateToken, upload.single('image'), userController.updateProduct);
router.delete('/products/:id', authenticateToken, userController.deleteProduct);
router.get('/products',authenticateToken, userController.getProducts);

module.exports = router;
