import apiClient from './client';
import { API_URL } from '../store/config';

// const getToken = () => {
//     return localStorage.getItem('jwtToken');
// };

// Register User
const registerUser = async (userData) => {
    try {
        const response = await apiClient.post(API_URL.REGISTER, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error message:', error.message);
        throw error;
    }
};
// Login User
const loginUser = async ({ email, password }) => {
    try {
        const response = await apiClient.post(API_URL.LOGIN, { email, password }, {
            withCredentials: true,
        });
        const { role, user: { userName } } = response.data;
        localStorage.setItem('role', role);
        localStorage.setItem('name', userName);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};
// Create Product
const createProduct = async (formData) => {
    try {
        // const token = getToken();
        const response = await apiClient.post(API_URL.PRODUCTS, formData, {
            headers: {
                // // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error message:', error.message);
        throw error;
    }
};
// Get Product
const fetchProducts = async (page = 1, searchTerm = '', sortBy = 'name', sortType = 'asc', startDate, endDate) => {
    try {
        // const token = getToken();
        const response = await apiClient.get(API_URL.PRODUCTS, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
            params: {
                page,
                limit: 6,
                searchTerm,
                sortBy,
                sortType,
                startDate,
                endDate
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};
// Delete Product
const deleteProduct = async (id) => {
    try {
        // const token = getToken();
        const response = await apiClient.delete(API_URL.DELETE(id), {
            // headers: {
            //     'Authorization': `Bearer ${token}`
            // },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error.message);
        throw error;
    }
};
// Update Product
const updateProduct = async (id, formData) => {
    try {
        // const token = getToken();
        const response = await apiClient.put(API_URL.UPDATE(id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // // 'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};
// Create Address
const createAddress = async (formData) => {
    try {
        // const token = getToken();
        const response = await apiClient.post(API_URL.ADDRESSES, formData, {
            headers: {
                // // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating address:', error.message);
        throw error;
    }
};
// Fetch Addresses
const fetchAddress = async (page = 1, searchTerm = '', sortBy = 'city', sortType = 'asc') => {
    try {
        // const token = getToken();
        const response = await apiClient.get(API_URL.ADDRESSES, {
            headers: {
                // // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                page,
                limit: 6,
                search: searchTerm,
                sortBy,
                sortType
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error.message);
        throw error;
    }
};
// Update Address
const updateAddress = async (id, formData) => {
    try {
        // const token = getToken();
        const response = await apiClient.put(API_URL.UPDATE_ADDRESS(id), formData, {
            headers: {
                // // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating address:', error.message);
        throw error;
    }
};
// Delete Address
const deleteAddress = async (id) => {
    try {
        // const token = getToken();
        const response = await apiClient.delete(API_URL.DELETE_ADDRESS(id), {
            // headers: {
            //     // 'Authorization': `Bearer ${token}`,
            // },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting address:', error.message);
        throw error;
    }
};
// Add Cart
const addToCart = async (productId, quantity) => {
    try {
        // const token = getToken();
        const response = await apiClient.post(API_URL.CART, { productId, quantity }, {
            // headers: { 
            //     Authorization: `Bearer ${token}` 
            // }
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        throw error;
    }
};
// Fetch Cart 
const fetchCartItems = async () => {
    try {
        // const token = getToken();
        const response = await apiClient.get(API_URL.CART, {
            // headers: { 
            //     Authorization: `Bearer ${token}` 
            // }
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
        throw error;
    }
};
// Update Cart 
const updateCartQuantity = async (productId, quantity) => {
    try {
        const token = getToken();
        const response = await apiClient.put(API_URL.UPDATE_CART(productId), { quantity }, {
            // headers: {
            //     Authorization: `Bearer ${token}` 
            // }
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error.message);
        throw error;
    }
};
// Remove Cart 
const removeCartItem = async (productId) => {
    try {
        // const token = getToken();
        const response = await apiClient.delete(API_URL.DELETE_CART(productId), {
            // headers: { 
            //     Authorization: `Bearer ${token}` 
            // }
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error removing item from cart:", error.message);
        throw error;
    }
};
//Order Create
const createOrder = async (amount, productId) => {
    try {
        const response = await apiClient.post(API_URL.ORDER, {
            amount,
            currency: 'INR',
            receipt: `receipt_${productId || 'default'}`,
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.message);
        throw error;
    }
};
//Verify Payment
const verifyPayment = async (paymentData) => {
    try {
        const response = await apiClient.post(API_URL.PAYMENT, paymentData);
        return response.data;
    } catch (error) {
        console.error("Error verifying payment:", error.message);
        throw error;
    }
};

export {
    registerUser,
    loginUser,
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    fetchAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    addToCart,
    fetchCartItems,
    updateCartQuantity,
    removeCartItem,
    createOrder,
    verifyPayment,
};