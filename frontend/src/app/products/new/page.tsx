import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

function ProductsNewPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Card>
        <CardHeader>
          <h2 className='text-2xl font-bold'>Create New Product</h2>
        </CardHeader>
        <CardContent>
          <form>
            <Label htmlFor='name'>Product Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='Enter product name'
              className='mb-4'
            />
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              name='description'
              type='text'
              placeholder='Enter product description'
              className='mb-4'
            />
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              name='price'
              type='number'
              placeholder='Enter product price'
              className='mb-4'
            />
            <Label htmlFor='image'>Image</Label>
            <Input id='image' name='image' type='file' className='mb-4' />
            <Button>Create Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
