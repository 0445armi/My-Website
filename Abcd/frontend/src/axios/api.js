import axios from 'axios';
import { API_URL } from '../store/config';

const getToken = () => {
    return localStorage.getItem('jwtToken');
};

//Register User
const registerUser = async (formData) => {
    try {
        const response = await axios.post(API_URL.REGISTER, JSON.stringify(formData), {
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
        return response.data;
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
        const deleteUrl = API_URL.DELETE(id);
        const response = await axios.delete(deleteUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
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
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.message);
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
};
