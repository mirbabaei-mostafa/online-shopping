import axios from 'axios';
import '../types/Products';

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:4004/' : '/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
