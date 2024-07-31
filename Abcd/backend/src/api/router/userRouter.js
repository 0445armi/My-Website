const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../../utils/file_upload');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/products', upload.single('image'), userController.createProduct);
router.put('/products/:id', userController.updateProduct);
router.delete('/products/:id', userController.deleteProduct);
router.get('/products', userController.getProducts);

module.exports = router;
