const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

//Register
exports.registerController = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: 'Successfully Register',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error is Registrations',
            error
        });
    }
};
//Login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            })
        }
        const {token, userName, address, phone, role} = await userService.loginUser({ email, password });
        res.cookie('token', token, {
            httpOnly: true, 
            secure: false, 
        });
        res.status(200).json({
            success: true,
            message: 'Successfully Login',
            user:{userName, email, address, phone},
            // token,
            role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error in Login',
            error
        });
    }
};