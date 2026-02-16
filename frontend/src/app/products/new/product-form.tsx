'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { createProduct } from '../products.api';

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

function productForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await createProduct({
      ...data,
      image: data.image || undefined,
    });
    router.push('/');
  });

  return (
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
      <Button type='submit'>Create Product</Button>
    </form>
  );
}

export default productForm;
