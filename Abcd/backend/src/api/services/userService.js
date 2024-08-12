const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../../utils/passwordUtils');

//Register
const registerUser = async ({ userName, email, password, phone, address }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Already Register please login');
    const hashedPassword = await hashPassword(password);
    const user = await new User({ userName, email, phone, address, password: hashedPassword }).save()
    return user; 
};
//Login
const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email is not Registered');
    const match = await comparePassword(password, user.password)
    if(!match) throw new Error('Invalid Password');
    const token = jwt.sign({ userId: user._id, userName: user.userName }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    return { token, 
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        address: user.address,
    };
};

module.exports = {
    registerUser, 
    loginUser
};