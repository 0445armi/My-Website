const productService = require('../services/productService');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Create Product
exports.createProduct = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, price, category, quantity, addressId } = req.body;
        const productData = {
            name,
            price,
            category,
            quantity,
            image: req.file.filename, 
            userId,
            addressId
        };
        const product = await productService.createProduct(productData);
        io.emit('newProduct', product);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//Get Product
exports.getProducts = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, searchTerm = '', sortBy = 'name', sortType = 'asc' } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const { products, totalPages } = await productService.fetchProducts(userId, parsedPage, parsedLimit, searchTerm, sortBy, sortType);
        res.status(200).json({ products, totalPages });
    } catch (error) {   
        res.status(400).json({ message: error.message });
    }
};
//Update Product
exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body, req.file);
        io.emit('updateProduct', product);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        io.emit('deleteProduct', req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
