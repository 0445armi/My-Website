const addressServices = require('../services/addressService');

//Create Address
exports.createAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const addressData = { ...req.body, userId };
        const address = await addressServices.createAddress(addressData);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Get Address
exports.getAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const address = await addressServices.fetchAddress(userId);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update Address
exports.updateAddress = async (req, res) => {
    try {
        const address = await addressServices.updateAddress(req.params.id, req.body);
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete Address
exports.deleteAddress = async (req, res) => {
    try {
        await addressServices.deleteAddress(req.params.id);
        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

