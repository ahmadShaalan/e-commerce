import { Link } from 'react-router-dom';
import { DataTable, type DataTableColumn } from '../../../components/DataTable';
import { Spinner } from '../../../components/Spinner';
import { useGetProducts } from '../api/getProducts';
import type { ProductItem, ProductStatus } from '../types/products.types';
import { getStorageUrl } from '../../../utils/getImgUrlApi';
import { formatCurrency } from '../../../utils/format';
import { Pencil, Trash2 } from 'lucide-react';

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

  if (isLoading) {
    return <Spinner />;
  }

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
            className="flex cursor-pointer items-center justify-center rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
            <h1>Delete</h1>
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={products?.items ?? []}
      columns={columns}
      rowKey={(p) => p.id}
    />
  );
};

export default ProductsList;
