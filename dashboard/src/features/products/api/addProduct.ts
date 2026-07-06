import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../../../lib/httpClient';
import type { ProductItem, ProductResponse } from '../types/products.types';
import type { ProductFormValues } from '../types/product.schema';
import { uploadProductImage } from './uploadProductImage';

export const addProduct = async (
  data: ProductFormValues,
): Promise<ProductItem> => {
  const response = await httpClient.post<ProductResponse[]>('/products', data);

  if (data.image) {
    await uploadProductImage(response.data[0].items[0].id, data.image);
  }

  return response.data[0].items[0];
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
