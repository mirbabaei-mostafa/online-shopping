import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import { Product } from '../types/Products';
import { ApiError } from '../types/ApiError';

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: () => fetshProducts(),
  });

const fetshProducts = async (): Promise<Product[]> =>
  (await apiClient.get<Product[]>('api/products')).data;
