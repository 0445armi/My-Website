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
    const product = new Product(productData);
    await product.save();
    return product;
};

// Update Product
const updateProduct = async (id, updateFields) => {
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
const fetchProducts = async (page, limit, search, sortBy, sortType) => {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const sortOptions = { [sortBy]: sortType === 'asc' ? 1 : -1 };
    const products = await Product.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    return { products, totalPages };
};

module.exports = {registerUser, loginUser, createProduct, updateProduct, deleteProduct, fetchProducts};