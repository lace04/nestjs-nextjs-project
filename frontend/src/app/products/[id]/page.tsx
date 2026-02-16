import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { getProduct } from '../products.api';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  return (
    <>
      <div className='mb-6'>
        <Link
          href='/'
          className={buttonVariants({ variant: 'outline', size: 'sm' })}
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Volver
        </Link>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div className='flex items-center justify-center bg-muted rounded-lg p-8'>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className='max-w-full max-h-[500px] object-contain rounded-lg'
            />
          ) : (
            <div className='w-full h-[500px] flex items-center justify-center'>
              <p className='text-muted-foreground text-xl'>Sin imagen</p>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-6'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>{product.name}</h1>
            <p className='text-muted-foreground text-lg'>
              {product.description || 'Sin descripción disponible'}
            </p>
          </div>

          <div className='flex items-baseline gap-2'>
            <span className='text-5xl font-bold'>${product.price}</span>
          </div>

          <div className='flex gap-3'>
            <Button size='lg' className='flex-1'>
              Comprar ahora
            </Button>
            <Button size='lg' variant='outline' className='flex-1'>
              Agregar al carrito
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detalles del producto</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className='grid grid-cols-2 gap-4'>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    ID del producto
                  </dt>
                  <dd className='text-sm'>{product.id}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Precio
                  </dt>
                  <dd className='text-sm'>${product.price}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
