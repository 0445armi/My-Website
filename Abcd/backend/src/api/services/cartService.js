const Cart = require('../models/cart');
const { getProductById } = require('../services/productService'); 

// Add to Cart
const addToCart = async ({ productId, quantity, userId }) => {
    const product = await getProductById(productId);
    if (!product) throw new Error('Product not found');
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    }
    await cart.save();
    return cart;
};

// Fetch Cart Items
const fetchCartItems = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) throw new Error('Cart not found');
    return cart.products;
};

// Update Cart Item Quantity
const updateCartItemQuantity = async ({ productId, quantity, userId }) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return cart;
    } else {
        throw new Error('Product not found in cart');
    }
};

// Remove Item from Cart
const removeCartItem = async ({ productId, userId }) => {
    console.log('Removing product with ID:', productId, 'for user:', userId);
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');
    const updatedProducts = cart.products.filter(p => p.productId.toString() !== productId);
    if (updatedProducts.length === cart.products.length) {
        throw new Error('Product not found in cart');
    }
    cart.products = updatedProducts;
    await cart.save();
    return cart;
};

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItemQuantity,
    removeCartItem
};
