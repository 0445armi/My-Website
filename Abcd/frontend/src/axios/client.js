import axios from 'axios';
import { BASE_URL } from '../store/config';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});

apiClient.interceptors.request.use((config) => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='));
        if (cookieValue) {
            const accessToken = cookieValue.split('=')[1];
            console.log("AccessToken:", accessToken);
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { data } = await apiClient.post('/api/refresh-token');
            document.cookie = `accessToken=${data.accessToken}; path=/;`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            console.error('Failed to refresh access token:', refreshError);
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

export default apiClient;