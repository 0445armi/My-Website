export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5174';

export const API_URL = {
    REGISTER: `${BASE_URL}/api/register`,
    LOGIN: `${BASE_URL}/api/login`,
    PRODUCTS: `${BASE_URL}/api/products`, 
    DELETE: (id) => `${BASE_URL}/api/products/${id}` ,
    UPDATE: (id) => `${BASE_URL}/api/products/${id}`
};
