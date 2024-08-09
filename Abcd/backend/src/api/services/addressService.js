const Address = require('../models/Address');

// Create Address
const createAddress = async (addressData) => {
    const address = new Address(addressData);
    await address.save();
    return address;
};

// Update Address
const updateAddress = async (id, updateFields) => {
    const address = await Address.findByIdAndUpdate(id, updateFields, { new: true });
    if (!address) throw new Error('Address not found');
    return address;
};

// Delete Address
const deleteAddress = async (id) => {
    const result = await Address.findByIdAndDelete(id);
    if (!result) throw new Error('Address not found');
    return result;
};

// Fetch Address
const fetchAddress = async (userId) => {
    const address = await Address.find({ userId });
    return address;
};

module.exports = { 
    createAddress, 
    updateAddress, 
    deleteAddress, 
    fetchAddress 
};
