import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '../components/ProductForm';
import type { ProductFormValues } from '../types/product.schema';
import { useAddProduct } from '../api/addProduct';
import { toast } from '../../../store/toastStore';

export function CreateProductPage() {
  const navigate = useNavigate();
  const createProduct = useAddProduct();

  const handleSubmit = (values: ProductFormValues) => {
    createProduct.mutate(values, {
      onSuccess: () => {
        toast.success('Product created');

        navigate('/dashboard/products');
      },
      onError: () => {
        toast.error('Could not create the product. Check the slug is unique.');
      },
    });
  };

  return (
    <main className="px-8 py-8">
      <Link
        to="/products"
        className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900"
      >
        <ArrowLeft className="h-3 w-3" />
        Products
      </Link>

      <ProductForm
        submitLabel="Create product"
        showImageField
        onSubmit={handleSubmit}
        isSubmitting={createProduct.isPending}
      />
    </main>
  );
}
