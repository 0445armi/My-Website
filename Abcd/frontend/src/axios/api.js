import axios from 'axios';
import io from 'socket.io-client';
import { API_URL } from '../store/config';

const socket = io('http://localhost:5175');

const getToken = () => {
    return localStorage.getItem('jwtToken');
};

//Register User
const registerUser = async (formData) => {
    try {
        const response = await axios.post(API_URL.REGISTER, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error message:', error.message);
        throw error;
    }
};
//Login User
const loginUser = async ({email, password}) => {
    try {
        const response = await axios.post(API_URL.LOGIN, { email, password });
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};
//Create Product
const createProduct = async (formData) => {
    try {
        const token = getToken();
        const response = await axios.post(API_URL.PRODUCTS, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        });
        const createdProduct = response.data;
        socket.emit('newProduct', createdProduct);
        return createdProduct;
    } catch (error) {
        console.error('Error message:', error.message);
        throw error;
    }
};
//Get Product
const fetchProducts = async (page = 1, searchTerm = '', sortBy = 'name', sortType = 'asc') => {
    try {
        const token = getToken();
        const response = await axios.get(API_URL.PRODUCTS, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page,
                limit: 4, 
                search: searchTerm,
                sortBy,
                sortType    
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};
//Delete Product
const deleteProduct = async (id) => {
    try {
        const token = getToken();
        const response = await axios.delete(API_URL.DELETE(id), {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        socket.emit('deleteProduct', id);
    } catch (error) {
        console.error('Error deleting product:', error.message);
        throw error;
    }
};
//Update Product
const updateProduct = async (id, formData) => {
    try {
        const token = getToken();
        const response = await axios.put(API_URL.UPDATE(id), formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        const updatedProduct = response.data;
        socket.emit('updateProduct', updatedProduct);
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};
// Fetch Addresses
const fetchAddress = async (page = 1, searchTerm = '', sortBy = 'city', sortType = 'asc') => {
    try {
        const token = getToken();
        const response = await axios.get(API_URL.ADDRESSES, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                page,
                limit: 4, 
                search: searchTerm,
                sortBy,
                sortType
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error.message);
        throw error;
    }
};
// Create Address
const createAddress = async (formData) => {
    try {
        const token = getToken();
        const response = await axios.post(API_URL.ADDRESSES, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating address:', error.message);
        throw error;
    }
};
// Update Address
const updateAddress = async (id, formData) => {
    try {
        const token = getToken();
        const response = await axios.put(API_URL.UPDATE_ADDRESS(id), formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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
        const token = getToken();
        const response = await axios.delete(API_URL.DELETE_ADDRESS(id), {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting address:', error.message);
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
    deleteAddress
};
