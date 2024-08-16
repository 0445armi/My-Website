import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { addToCart, fetchProducts } from "../../axios/api";
import { BASE_URL } from "../../store/config";
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const loadProducts = async () => {
        try {
            const response = await fetchProducts();
            setProducts(response.products || []);
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    };

    useEffect(() => {
        loadProducts();
        socket.on('newProduct', (newProduct) => {
            setProducts((prevProducts) => [...prevProducts, newProduct]);
        });
        socket.on('updateProduct', (updatedProduct) => {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
        });
        socket.on('deleteProduct', (deletedProductId) => {
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== deletedProductId)
            );
        });
        return () => {
            socket.off('newProduct');
            socket.off('updateProduct');
            socket.off('deleteProduct');
        };
    }, []);

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product._id, 1); 
            navigate("/cart");
        } catch (error) {
            console.error("Error adding to cart:", error.message);
        }
    };

    return (
        <div className="home-container">
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            {product.image && (
                                <img
                                    src={`${BASE_URL}/uploads/${product.image}`}
                                    alt={product.name}
                                    className="product-image"
                                    style={{ width: '150px', height: 'auto' }}
                                />
                            )}
                            <h2>{product.name}</h2>
                            <p>Price: {product.price}</p>
                            <p>Category: {product.category}</p>
                            <button onClick={() => handleAddToCart(product)} className="btn1">Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <div className="not">No Products Available</div>
                )}
            </div>
        </div>
    );
};

export default Home;
