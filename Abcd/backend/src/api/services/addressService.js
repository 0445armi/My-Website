const Address = require('../models/address');

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
const fetchAddress = async (userId, page, limit, search, sortBy, sortType) => {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const matchStage = search
        ? { name: { $regex: new RegExp(search, 'i') }, userId }
        : {};
    const sortStage = {
        [sortBy]: sortType === 'asc' ? 1 : -1,
    };
    const skipStage = (page - 1) * limit;
    const limitStage = limit;
    const pipeline = [
        { $match: matchStage },
        { $sort: sortStage },
        { $skip: skipStage },
        { $limit: limitStage },
        // {
        //     $lookup: {
        //         from: 'addresses',            
        //         localField: 'addressId',     
        //         foreignField: 'addressId',      
        //         as: 'address',            
        //     },
        // },
        // {
        //     $unwind: {
        //         path: '$address',
        //     },
        // },
        // {
        //     $lookup: {
        //         from: 'users',                 
        //         localField: 'address.userId',  
        //         foreignField: '_id',           
        //         as: 'address.user',            
        //     },
        // },
        // {
        //     $unwind: {
        //         path: '$address.user',         
        //     },
        // },
        // {
        //     $project: {
        //         'address.__v': 0,             
        //         'address.user.password': 0,   
        //         'address.user.__v': 0,        
        //     },
        // },
    ];
    const addresses = await Address.aggregate(pipeline);
    const totalAddresses = await Address.countDocuments(matchStage);
    const totalPages = Math.ceil(totalAddresses / limit);
    return { addresses, totalPages };
};

module.exports = { 
    createAddress, 
    updateAddress, 
    deleteAddress, 
    fetchAddress 
};
