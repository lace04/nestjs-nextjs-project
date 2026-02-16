import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

import { getProducts } from './products/products.api';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <div className='space-y-4 flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>NextNestApp</h1>
        <Link
          href='/products/new'
          className={buttonVariants({ variant: 'outline' })}
        >
          New Product
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {products.map((product: any) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full h-48 object-cover rounded-md'
                />
              )}
            </CardContent>
            <CardFooter>
              <p className='text-lg font-bold'>${product.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default HomePage;
