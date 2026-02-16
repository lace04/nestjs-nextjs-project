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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteProduct } from './products.api';
import { useState } from 'react';

function productCard({ product }: any) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success('Producto eliminado correctamente');
      router.refresh();
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/${product.id}/edit`);
  };

  return (
    <>
      <Card key={product.id} className='flex flex-col h-full'>
        <div onClick={handleCardClick} className='cursor-pointer flex-1 flex flex-col'>
          <CardHeader className='flex-none'>
            <CardTitle className='hover:text-primary transition-colors'>
              {product.name}
            </CardTitle>
            <CardDescription className='min-h-10 line-clamp-2'>
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
                variant='outline'
                size='icon'
                onClick={handleEdit}
              >
                <Edit className='h-4 w-4' />
              </Button>
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

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de eliminar "{product.name}"? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default productCard;
