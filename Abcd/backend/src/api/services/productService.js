const Product = require("../models/product");

// Create Product
const createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};
// Update Product
const updateProduct = async (id, updateFields, file) => {
    if (file) {
        updateFields.image = file.filename;
    } else {
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
        ? { name: {$regex: new RegExp(search, 'i')}, userId }
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
                foreignField: '_id',
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
            $lookup: {
                from: 'users',
                localField: 'address.userId',
                foreignField: '_id',
                as: 'address.user',
            },
        },
        {
            $unwind: {
                path: '$address.user',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                'address.__v': 0,
                'address.user.password': 0,
                'address.user.__v': 0,
            },
        },
    ];
    const products = await Product.aggregate(pipeline);
    const totalProducts = await Product.countDocuments(matchStage);
    const totalPages = Math.ceil(totalProducts / limit);
    return { products, totalPages };
};
//get product by Id 
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        throw error;
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    getProductById
};