'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { createProduct } from '../products.api';

function productForm() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    await createProduct({
      ...data,
      price: parseFloat(data.price),
    });
    router.push('/');
  });

  return (
    <form onSubmit={onSubmit}>
      <Label htmlFor='name'>Product Name</Label>
      <Input
        {...register('name', { required: true })}
        id='name'
        name='name'
        type='text'
        placeholder='Enter product name'
        className='mb-4'
      />
      <Label htmlFor='description'>Description</Label>
      <Input
        {...register('description')}
        id='description'
        name='description'
        type='text'
        placeholder='Enter product description'
        className='mb-4'
      />
      <Label htmlFor='price'>Price</Label>
      <Input
        {...register('price', { required: true })}
        id='price'
        name='price'
        type='number'
        placeholder='Enter product price'
        className='mb-4'
      />
      <Label htmlFor='image'>Image</Label>
      <Input id='image' name='image' type='text' className='mb-4' />
      <Button type='submit'>Create Product</Button>
    </form>
  );
}

export default productForm;
