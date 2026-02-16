import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

import { getProducts } from './products/products.api';
import ProductCard from './products/product-card';

async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <div className='space-y-4 flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>App</h1>
        <Link
          href='/products/new'
          className={buttonVariants({ variant: 'outline' })}
        >
          New Product
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 items-stretch'>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default HomePage;
