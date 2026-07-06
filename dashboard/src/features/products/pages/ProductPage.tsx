import { Link } from 'react-router-dom';
import ProductsList from '../components/ProductsList';
import { Plus } from 'lucide-react';

const ProductPage = () => {
  return (
    <main className="space-y-6 p-8">
      {/* Action row */}
      <div className="flex items-center justify-end">
        <Link
          to="/dashboard/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      </div>

      {/* Table */}
      <ProductsList />
    </main>
  );
};

export default ProductPage;
