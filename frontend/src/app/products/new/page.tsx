import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ProductForm from './product-form';

function ProductsNewPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <Card>
        <CardHeader>
          <h2 className='text-2xl font-bold'>Create New Product</h2>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductsNewPage;
