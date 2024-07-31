import React, { useEffect, useState } from "react";
import "../styles/Home.css"; 
import { fetchProducts } from "../axios/api"; 
import { BASE_URL } from "../store/config";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error.message);
            }
        };

        loadProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    return (
        <div className="home-container">
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <p>Category: {product.category}</p>
                            <p>Quantity: {product.quantity}</p>
                            {product.image && (
                                <img
                                    src={`${BASE_URL}/uploads/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            )}
                            <button onClick={() => addToCart(product)} className="btn1">Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No Cards available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
