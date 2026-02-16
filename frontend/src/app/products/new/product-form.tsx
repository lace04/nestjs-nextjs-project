'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { createProduct, updateProduct } from '../products.api';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100),
  description: z.string().optional(),
  price: z.string().min(1, 'Price is required').transform((val) => {
    const num = parseFloat(val);
    if (isNaN(num) || num <= 0) {
      throw new Error('Price must be a positive number');
    }
    return num;
  }),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: any;
  isEditing?: boolean;
}

function productForm({ product, isEditing = false }: ProductFormProps) {
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description || '',
          price: product.price.toString(),
          image: product.image || '',
        }
      : undefined,
  });
  const router = useRouter();
  
  const onSubmit = handleSubmit(async (data) => {
    if (isEditing && product) {
      setPendingData(data);
      setShowUpdateAlert(true);
    } else {
      await handleCreate(data);
    }
  });

  const handleCreate = async (data: any) => {
    try {
      await createProduct({
        ...data,
        image: data.image || undefined,
      });
      toast.success('Producto creado correctamente');
      router.push('/');
    } catch (error) {
      toast.error('Error al crear el producto');
    }
  };

  const confirmUpdate = async () => {
    try {
      await updateProduct(product.id, {
        ...pendingData,
        image: pendingData.image || undefined,
      });
      toast.success('Producto actualizado correctamente');
      router.push('/');
    } catch (error) {
      toast.error('Error al actualizar el producto');
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Label htmlFor='name'>Product Name</Label>
        <Input
          {...register('name')}
          id='name'
          type='text'
          placeholder='Enter product name'
          className='mb-1'
        />
        {errors.name && (
          <p className='text-destructive text-sm mb-4'>{errors.name.message}</p>
        )}
        <Label htmlFor='description'>Description</Label>
        <Input
          {...register('description')}
          id='description'
          type='text'
          placeholder='Enter product description'
          className='mb-1'
        />
        {errors.description && (
          <p className='text-destructive text-sm mb-4'>
            {errors.description.message}
          </p>
        )}
        <Label htmlFor='price'>Price</Label>
        <Input
          {...register('price')}
          id='price'
          type='number'
          step='0.01'
          placeholder='Enter product price'
          className='mb-1'
        />
        {errors.price && (
          <p className='text-destructive text-sm mb-4'>{errors.price.message}</p>
        )}
        <Label htmlFor='image'>Image URL</Label>
        <Input
          {...register('image')}
          id='image'
          type='text'
          placeholder='https://example.com/image.jpg'
          className='mb-1'
        />
        {errors.image && (
          <p className='text-destructive text-sm mb-4'>{errors.image.message}</p>
        )}
        <Button type='submit'>{isEditing ? 'Actualizar' : 'Crear'}</Button>
      </form>

      {isEditing && (
        <AlertDialog open={showUpdateAlert} onOpenChange={setShowUpdateAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Actualizar producto?</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de actualizar "{product?.name}"? Los cambios se guardarán.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmUpdate}>
                Actualizar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default productForm;
