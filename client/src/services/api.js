import axios from 'axios';
import { toast } from 'react-hot-toast'; // Para notificações globais

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    // Se for erro 401 (Não autorizado) e não for a rota de login
    if (error.response && error.response.status === 401 && !error.config.url.includes('/api/users/login')) {
      localStorage.removeItem('token');
      toast.error('Sessão expirada ou inválida. Faça login novamente.');
      window.location.href = '/login'; // Redireciona forçado para login
    }
    return Promise.reject(error);
  }
);

export default api;