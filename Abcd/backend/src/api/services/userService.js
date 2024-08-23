const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../../utils/passwordUtils');

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { userId: user._id, userName: user.userName, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '5m' } 
    );
    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } 
    );
    return { accessToken, refreshToken };
};

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, userData) => {
            if (err) {
                return reject('Invalid refresh token');
            }
            resolve(userData);
        });
    });
};

//Register
const registerUser = async ({ userName, email, password, phone, address, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Already Register please login');
    const hashedPassword = await hashPassword(password);
    const user = await new User({ userName, email, phone, address, password: hashedPassword, role }).save()
    return user; 
};
//Login
const loginUser = async ({ email, password }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Email is not Registered');
        const match = await comparePassword(password, user.password);
        if (!match) throw new Error('Invalid Password');
        const { accessToken, refreshToken } = generateTokens(user);
        return { 
            accessToken, 
            refreshToken,
            userName: user.userName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        };
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(403).json({ message: 'No refresh token provided' });
    }
    try {
        const userData = await verifyRefreshToken(refreshToken);
        const newAccessToken = jwt.sign(
            { userId: userData.userId, userName: userData.userName, role: userData.role},
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

module.exports = {
    registerUser, 
    loginUser,
    refreshAccessToken
};