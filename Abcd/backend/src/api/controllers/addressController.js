const userAddress = require('../services/addressService');

exports.createAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const addressData = { ...req.body, userId };
        const address = await userAddress.createAddress(addressData);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const address = await userAddress.updateAddress(req.params.id, req.body);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        await userAddress.deleteAddress(req.params.id);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const address = await userAddress.fetchAddress(userId);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
