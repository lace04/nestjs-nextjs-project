'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteProduct } from './products.api';

function productCard({ product }: any) {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(product.id);
      router.refresh();
    }
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <Card key={product.id} className='flex flex-col h-full'>
      <div onClick={handleCardClick} className='cursor-pointer flex-1 flex flex-col'>
        <CardHeader className='flex-none'>
          <CardTitle className='hover:text-primary transition-colors'>
            {product.name}
          </CardTitle>
          <CardDescription className='min-h-[2.5rem] line-clamp-2'>
            {product.description || '\u00A0'}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex items-start'>
          <div className='w-full h-48 flex items-center justify-center bg-muted rounded-md hover:bg-muted/80 transition-colors'>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-full object-cover rounded-md'
              />
            ) : (
              <p className='text-muted-foreground'>Sin imagen</p>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className='flex-none mt-auto'>
        <div className='flex justify-between items-center w-full gap-2'>
          <p className='text-lg font-bold'>${product.price}</p>
          <div className='flex gap-2'>
            <Button
              className='cursor-pointer'
              variant='destructive'
              size='icon'
              onClick={handleDelete}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
            <Button className='cursor-pointer'>Comprar</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default productCard;
