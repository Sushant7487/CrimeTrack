import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Aapka Backend URL

});

// Har request ke sath Token bhejne ke liye Interceptor
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const token = JSON.parse(userInfo).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;