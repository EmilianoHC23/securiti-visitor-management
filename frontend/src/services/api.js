import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // O la URL de tu backend
});

// Interceptor para añadir el token de autenticación a las cabeceras
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
