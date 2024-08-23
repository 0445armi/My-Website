import axios from 'axios';
import { BASE_URL } from '../store/config';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken'); 
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;
        if (response && response.status === 401) { 
            try {
                const refreshResponse = await axios.post(`${BASE_URL}/api/refresh-token`, {}, { withCredentials: true });
                const { accessToken } = refreshResponse.data;
                localStorage.setItem('accessToken', accessToken);
                response.config.headers['Authorization'] = `Bearer ${accessToken}`;
                return axios(response.config);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
