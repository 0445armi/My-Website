const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin, requireSignIn } = require('../middleware/auth');

router.post('/register', userController.registerController);
router.post('/login', userController.loginController);
router.get('/test',requireSignIn, isAdmin, userController.testController);

module.exports = router;