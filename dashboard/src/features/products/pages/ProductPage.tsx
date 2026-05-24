import { useGetProducts } from '../api/getProducts';

const ProductPage = () => {
  const { data } = useGetProducts();

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
};

export default ProductPage;
