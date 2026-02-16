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
import { deleteProduct, type Product } from './products.api';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success('Producto eliminado correctamente');
      router.refresh();
    } catch {
      toast.error('Error al eliminar el producto');
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${product.id}/edit`);
  };

  return (
    <>
      <Card className='flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border-border/50 hover:border-primary/30'>
        <Link href={`/products/${product.id}`} className='flex-1 flex flex-col'>
          <CardHeader className='flex-none pb-2'>
            <CardTitle className='group-hover:text-primary transition-colors text-xl font-bold'>
              {product.name}
            </CardTitle>
            <CardDescription className='min-h-10 line-clamp-2 text-sm leading-relaxed'>
              {product.description || '\u00A0'}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex-1 flex items-start p-4'>
            <div className='w-full h-48 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden transition-all duration-500 group-hover:bg-muted/50 relative'>
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-110'
                />
              ) : (
                <p className='text-muted-foreground font-medium'>Sin imagen</p>
              )}
            </div>
          </CardContent>
        </Link>
        <CardFooter className='flex-none mt-auto p-4 bg-muted/5 border-t border-border/10'>
          <div className='flex justify-between items-center w-full gap-2'>
            <p className='text-2xl font-black text-primary'>${product.price}</p>
            <div className='flex gap-2'>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleEdit}
                className='hover:bg-primary/10 hover:text-primary transition-colors'
                title='Editar'
              >
                <Edit className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                onClick={handleDelete}
                className='hover:bg-destructive/10 hover:text-destructive transition-colors'
                title='Eliminar'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
              <Button className='font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-95'>
                Comprar
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className='rounded-2xl border-none shadow-2xl'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-2xl font-bold'>¿Eliminar producto?</AlertDialogTitle>
            <AlertDialogDescription className='text-muted-foreground'>
              ¿Estás seguro de eliminar <span className='font-bold text-foreground'>&quot;{product.name}&quot;</span>? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='gap-2 sm:gap-0 font-medium'>
            <AlertDialogCancel className='rounded-xl border-border/50 hover:bg-muted'>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl px-6'
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ProductCard;
