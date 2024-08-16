const cartServices = require('../services/cartService');

// Add to Cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const cart = await cartServices.addToCart({ productId, quantity, userId });
        res.status(200).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product to cart', error: error.message });
    }
};

// Get Cart Items
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await cartServices.fetchCartItems(userId);
        res.status(200).json({ products: cartItems });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart items', error: error.message });
    }
};

// Update Cart Item Quantity
exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const cart = await cartServices.updateCartItemQuantity({ productId, quantity, userId });
        res.status(200).json({ message: 'Cart item quantity updated successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update cart item quantity', error: error.message });
    }
};

// Remove Item from Cart
exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;
        console.log('Removing product with ID:', productId);
        const cart = await cartServices.removeCartItem({ productId, userId });
        res.status(200).json({ message: 'Product removed from cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
    }
};
