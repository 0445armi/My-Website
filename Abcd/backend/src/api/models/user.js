const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    role: { 
        type: String, 
        enum: ['User', 'Admin'], 
        default: 'User'
    },
}, {
    timestamps: true, 
});

const User = mongoose.model('User', UserSchema);
module.exports = User;