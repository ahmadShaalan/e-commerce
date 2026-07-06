import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductResponse } from '../types/products.types';

export const getProducts = async (): Promise<ProductResponse> => {
  const response = await httpClient.get<ProductResponse>(
    '/rpc/search_products',
  );

  return response.data;
};

export const useGetProducts = () => {
  return useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
  });
};
