import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../store/config';
import { fetchCartItems, updateCartQuantity, removeCartItem, addToCart } from '../../axios/api.js';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const handleAddToCart = async (productId, quantity) => {
        try {
            await addToCart(productId, quantity);
            const updatedItems = await fetchCartItems();
            setCartItems(updatedItems.products || updatedItems);
        } catch (error) {
            console.error("Error adding to cart:", error.message);
        }
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await fetchCartItems();
                setCartItems(items.products || items);
            } catch (error) {
                console.error("Error fetching cart items:", error.message);
            }
        };
        fetchItems();
    }, []);

    const handleUpdateQuantity = async (itemId, quantity) => {
        try {
            console.log('Updating quantity for itemId:', itemId, 'to:', quantity);
            await updateCartQuantity(itemId, quantity);
            const updatedItems = await fetchCartItems();
            setCartItems(updatedItems.products || updatedItems);
        } catch (error) {
            console.error("Error updating cart item:", error.message);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeCartItem(itemId);
            setCartItems(cartItems.filter(item => item.productId._id !== itemId));
        } catch (error) {
            console.error("Error removing item from cart:", error.message);
        }
    };

    const handleBuyNow = () => {
        navigate("/checkout");
    };


    return (
        <div className="cart-container">
            {cartItems.length > 0 ? (
                cartItems.map((item) => {
                    const product = item.product || {};
                    return (
                        <div key={item.productId._id} className="cart-item">
                            <img
                                src={`${BASE_URL}/uploads/${product.image}`}
                                alt={item.productId.name}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h2>{item.productId.name}</h2>
                                <p>Price: {item.productId.price}</p>
                                <p>Category: {item.productId.category}</p>
                                <div className="quantity-control">
                                    <label htmlFor={`quantity-${item.productId._id}`}>Quantity:</label>
                                    <input
                                        type="number"
                                        id={`quantity-${item.productId._id}`}
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleUpdateQuantity(item.productId._id, e.target.value)}
                                    />
                                </div>
                            </div>
                            <button onClick={() => handleRemoveItem(item.productId._id)} className="btn1">Remove</button>
                            <button onClick={() => handleAddToCart(item.productId._id, item.quantity)} className="btn1">Add More</button> {/* Example button for adding more */}
                        </div>
                    );
                })
            ) : (
                <div className="not">Your Cart is Empty</div>
            )}
            <button onClick={handleBuyNow} className="btn1">Buy Now</button>
        </div>
    );
};

export default Cart;
