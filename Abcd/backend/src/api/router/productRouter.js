const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth'); 
const upload = require('../../utils/fileUploadUtil');
const productController = require('../controllers/productController');

router.post('/products', authenticateToken, upload.single('image'), productController.createProduct);
router.put('/products/:id', authenticateToken, upload.single('image'), productController.updateProduct);
router.delete('/products/:id', authenticateToken, productController.deleteProduct);
router.get('/products',authenticateToken, productController.getProducts);

module.exports = router;