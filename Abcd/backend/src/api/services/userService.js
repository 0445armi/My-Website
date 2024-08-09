const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Product = require('../models/Product');

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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token, userName: user.userName };
};

// Create Product
const createProduct = async (productData) => {
    const product = new Product({ ...productData });
    await product.save();
    return product;
};

// Update Product
const updateProduct = async (id, updateFields, file) => {
    if (file) {
        updateFields.image = file.filename; 
    }else {
        delete updateFields.image; 
    }
    const product = await Product.findByIdAndUpdate(id, updateFields, { new: true });
    if (!product) throw new Error('Product not found');
    return product;
};

// Delete Product
const deleteProduct = async (id) => {
    const result = await Product.findByIdAndDelete(id);
    if (!result) throw new Error('Product not found');
    return result;
};

// Fetch Products
const fetchProducts = async (userId, page, limit, search, sortBy, sortType) => {
    const matchStage = search
        ? { name: { $regex: new RegExp(search, 'i') },userId}
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
        {
            $lookup: {
                from: 'addresses',            
                localField: 'addressId',     
                foreignField: 'addressId',      
                as: 'address',            
            },
        },
        {
            $unwind: {
                path: '$address',
                preserveNullAndEmptyArrays: true, 
            },
        },
        {
            $project: {
                'address.__v': 0,
                'address._id': 0,
            },
        },
    ];
    const products = await Product.aggregate(pipeline);
    const totalProducts = await Product.countDocuments(matchStage);
    const totalPages = Math.ceil(totalProducts / limit);
    return { products, totalPages };
};

module.exports = {registerUser, loginUser, createProduct, updateProduct, deleteProduct, fetchProducts};