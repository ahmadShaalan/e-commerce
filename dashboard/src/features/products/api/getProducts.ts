import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { Product } from '../types/products.types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await httpClient.get<Product[]>('/rpc/search_products');

  return response.data;
};

export const useGetProducts = () => {
  return useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
  });
};
