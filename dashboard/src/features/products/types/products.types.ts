export type ProductStatus = 'draft' | 'published' | 'archived';

export interface Product {
  id: string;
  name: string;
  slug: string;
  stock: number;
  status: ProductStatus;
  base_price: number;
  image_path: string;
  category_name: string;
}
