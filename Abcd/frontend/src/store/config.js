export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

export const API_URL = {
    REGISTER: `${BASE_URL}/api/register`,
    LOGIN: `${BASE_URL}/api/login`,
    PRODUCTS: `${BASE_URL}/api/products`, 
    DELETE: (id) => `${BASE_URL}/api/products/${id}`,
    UPDATE: (id) => `${BASE_URL}/api/products/${id}`,
    ADDRESSES: `${BASE_URL}/api/address`,
    DELETE_ADDRESS: (id) => `${BASE_URL}/api/address/${id}`,
    UPDATE_ADDRESS: (id) => `${BASE_URL}/api/address/${id}`,
    CART: `${BASE_URL}/api/cart`,
    DELETE_CART: (id) => `${BASE_URL}/api/cart/${id}`,
    UPDATE_CART: (id) => `${BASE_URL}/api/cart/${id}`,
    ORDER: `${BASE_URL}/api/create-order`,
    PAYMENT : `${BASE_URL}/verify-payment`
};
