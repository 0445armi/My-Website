const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async ({ userName, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();

    return { userName: user.userName, email: user.email }; 
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token, userName: user.userName };
};

module.exports = {registerUser, loginUser}