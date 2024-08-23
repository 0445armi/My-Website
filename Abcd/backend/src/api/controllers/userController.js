const userService = require('../services/userService');

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
        const { accessToken, refreshToken, userName, address, phone, role } = await userService.loginUser({ email, password });
        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);
        res.status(200).json({
            success: true,
            message: 'Successfully Login',
            user: { userName, email, address, phone },
            role,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'error in Login',
            error
        });
    }
};

exports.refreshAccessTokenController = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(403).json({ message: 'No refresh token provided' });
    }
    try {
        const userData = await userService.verifyRefreshToken(refreshToken);
        const newAccessToken = userService.generateAccessToken(userData);
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        });
        res.status(200).json({ success: true });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
};