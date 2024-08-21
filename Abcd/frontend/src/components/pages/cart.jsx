import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../store/config';
import "../../styles/cart.css";
import { fetchCartItems, updateCartQuantity, removeCartItem, createOrder } from '../../axios/api.js';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchItems = async () => {
        try {
            const items = await fetchCartItems();
            setCartItems(items.products || items);
        } catch (error) {
            console.error("Error fetching cart items:", error.message);
        }
    };
    
    const handleIncreaseQuantity = async (productId, currentQuantity) => {
        try {
            const newQuantity = currentQuantity + 1;
            await updateCartQuantity(productId, newQuantity);
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId._id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error("Error increasing quantity:", error.message);
        }
    };

    const handleDecreaseQuantity = async (productId, currentQuantity) => {
        if (currentQuantity <= 1) return; 
        try {
            const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
            await updateCartQuantity(productId, newQuantity);
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.productId._id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        } catch (error) {
            console.error("Error decreasing quantity:", error.message);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await removeCartItem(productId);
            setCartItems(prevItems => prevItems.filter(item => item.productId._id !== productId));
        } catch (error) {
            console.error("Error removing item from cart:", error.message);
        }
    };
    
    const handleBuyNow = async (productId) => {
        const product = cartItems.find(item => item.productId._id === productId);
        if (!product) return;
        const { name, price } = product.productId;
        const amount = price * 100; 
        try {
            const order = await createOrder(amount, productId);
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name,
                description: "Test Transaction",
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const paymentData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        };
                        const result = await verifyPayment(paymentData);
                        if (result.success) {
                            alert("Payment successful!");
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Error verifying payment:", error.message);
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },
                notes: {
                    address: "",
                },
                theme: {
                    color: "#007bff",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error("Error in payment process:", error.message);
        }
    };
    
    useEffect(() => {
        fetchItems();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };
    
    return (
        <div className="cart-container">
            {cartItems.length > 0 ? (
                cartItems.map((item) => {
                    const product = item.productId || {};
                    const price = parseFloat(item.productId.price) || 0;
                    const totalPrice = price * item.quantity;
                    return (
                        <div key={item.productId._id} className="cart-item">
                            <img
                                src={`${BASE_URL}/uploads/${product.image}`}
                                alt={item.productId.name}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h2>{item.productId.name}</h2>
                                <p>Price: ₹{formatCurrency(price)}</p>
                                <p>Total: ₹{formatCurrency(totalPrice)}</p>
                                <p>Category: {item.productId.category}</p>
                                <div className="quantity-control">
                                    <label htmlFor={`quantity-${item.productId._id}`}>Quantity:</label>
                                    <div className="quantity-buttons">
                                        <button 
                                            onClick={() => handleDecreaseQuantity(item.productId._id, item.quantity)} 
                                            className="quantity-button"
                                        >-</button> 
                                        <input
                                            type="number"
                                            id={`quantity-${item.productId._id}`}
                                            value={item.quantity}
                                            min="1"
                                            readOnly
                                        />
                                        <button 
                                            onClick={() => handleIncreaseQuantity(item.productId._id, item.quantity)} 
                                            className="quantity-button"
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleRemoveItem(item.productId._id)} className="btn1">Remove</button>
                            <button onClick={() => handleBuyNow(item.productId._id)} className="btn1 buy-now">Buy Now</button>
                        </div>
                    );
                })
            ) : (
                <div className="not">Your Cart is Empty</div>
            )}
        </div>
    );
};

export default Cart;
