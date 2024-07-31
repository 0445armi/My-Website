const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,
    },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;