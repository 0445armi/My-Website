const userService = require('../services/userServices');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email or password');
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid email or password');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, userName: user.userName });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
