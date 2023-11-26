import axios from 'axios';
import '../types/Products';
import create from './HttpServices';

export default axios.create({
  baseURL: 'http://localhost:4004/api/products',
});

export const productService = create('');
