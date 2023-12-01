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

export const useGetProductWithSlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: () => fetshProductWithSlug(slug),
  });

const fetshProductWithSlug = async (slug: string): Promise<Product> =>
  (await apiClient.get<Product>('api/products/' + slug)).data;
