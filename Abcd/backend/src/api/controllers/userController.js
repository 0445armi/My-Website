const userService = require('../services/userServices');

exports.register = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, userName } = await userService.loginUser({ email, password });
        res.status(200).json({ token, userName });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const productData = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            image: req.file.filename, 
        };
        const product = await userService.createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await userService.updateProduct(req.params.id, req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await userService.deleteProduct(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', sortBy = 'name', sortType = 'asc' } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const { products, totalPages } = await userService.fetchProducts(parsedPage, parsedLimit, search, sortBy, sortType);
        res.status(200).json({ products, totalPages });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
