import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const searchProducts = async (searchTerm) => {
  try {
    const response = await api.get(`/product/search?title=${encodeURIComponent(searchTerm)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
