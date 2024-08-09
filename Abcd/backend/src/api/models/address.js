const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true, 
});

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;