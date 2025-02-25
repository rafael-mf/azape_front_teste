// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2402/',
});

export const login = (email, password) => api.post('/proof/session', { email, password });

export const getDashboardData = async (token, page = 1, limit = 6) => {
    const response = await api.get(`/proof/dashboard?page=${page}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
};

export default api;