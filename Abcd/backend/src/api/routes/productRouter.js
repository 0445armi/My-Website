const express = require('express');
const router = express.Router();
const upload = require('../../utils/fileUploadUtil');
const productController = require('../controllers/productController');
const { authenticateToken } = require('../middleware/auth');

router.post('/products',authenticateToken, upload.single('image'), productController.createProduct);
router.get('/products', authenticateToken, productController.getProducts);
router.put('/products/:id', authenticateToken, upload.single('image'), productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);

module.exports = router;