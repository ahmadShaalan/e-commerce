import { Link } from 'react-router-dom';
import { DataTable, type DataTableColumn } from '../../../components/DataTable';
import { Spinner } from '../../../components/Spinner';
import { useGetProducts } from '../api/getProducts';
import type { ProductItem, ProductStatus } from '../types/products.types';
import { getStorageUrl } from '../../../utils/getImgUrlApi';
import { formatCurrency } from '../../../utils/format';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteProduct } from '../api/deleteProduct';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { toast } from '../../../store/toastStore';
import { useState } from 'react';

const STATUS: Record<ProductStatus, { label: string; className: string }> = {
  draft: { label: 'draft', className: 'bg-zinc-100 text-zinc-700' },
  published: {
    label: 'published',
    className: 'bg-emerald-100 text-emerald-700',
  },
  archived: {
    label: 'archived',
    className: 'bg-zinc-100 text-zinc-500 line-through',
  },
};

function stockBadge(stock: number) {
  if (stock === 0) return 'bg-red-100 text-red-700';
  if (stock < 5) return 'bg-amber-100 text-amber-700';
  return 'bg-emerald-100 text-emerald-700';
}

const ProductsList = () => {
  const { data: products, isLoading } = useGetProducts();
  const { mutateAsync: deleteProduct, isPending } = useDeleteProduct();

  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(
    null,
  );

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      toast.success(`"${productToDelete.name}" was deleted.`, {
        position: 'top-center',
      });
      setProductToDelete(null);
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  const columns: DataTableColumn<ProductItem>[] = [
    {
      key: 'name',
      header: 'Product',
      cell: (p) => {
        const imgPath =
          p.image_path && getStorageUrl('product-images', p.image_path);

        return (
          <Link to={`/products/${p.id}`} className="flex items-center gap-3">
            <img
              src={imgPath}
              alt={p.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <div className="truncate font-medium">{p.name}</div>
              <div className="truncate text-xs text-zinc-500">{p.slug}</div>
            </div>
          </Link>
        );
      },
    },
    {
      key: 'category',
      header: 'Category',
      className: 'text-zinc-700',
      cell: (p) => p.category_name ?? '—',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (p) => {
        const s = STATUS[p.status];
        return (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.className}`}
          >
            {s.label}
          </span>
        );
      },
    },
    {
      key: 'stock',
      header: 'Stock',
      cell: (p) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${stockBadge(p.stock)}`}
        >
          {p.stock} in stock
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      className: 'tabular-nums text-zinc-700',
      cell: (p) => formatCurrency(p.base_price),
    },

    {
      key: 'actions',
      header: 'Actions',
      className: 'w-[100px]',
      cell: (p) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              setProductToDelete(p);
            }}
            className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DataTable
        data={products?.items ?? []}
        columns={columns}
        rowKey={(p) => p.id}
      />

      <ConfirmDialog
        open={productToDelete !== null}
        title="Delete Product"
        message={
          productToDelete
            ? `Are you sure you want to delete "${productToDelete.name}"?`
            : 'Are you sure you want to delete this product?'
        }
        onConfirm={handleDeleteProduct}
        onCancel={() => setProductToDelete(null)}
        isConfirming={isPending}
      />
    </>
  );
};

export default ProductsList;
