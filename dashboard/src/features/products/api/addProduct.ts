import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductItem } from '../types/products.types';

export const addProduct = async (): Promise<ProductItem> => {
  const response = await httpClient.post<ProductItem[]>('/products');

  return response.data[0];
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({});
    },
  });
};
