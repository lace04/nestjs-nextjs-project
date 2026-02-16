import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from '../../new/product-form';
import { getProduct } from '../../products.api';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  
  try {
    const product = await getProduct(parseInt(id));
    
    if (!product) {
      redirect('/');
    }

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
      
      <div className='flex justify-center items-start min-h-screen'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm product={product} isEditing={true} />
          </CardContent>
        </Card>
      </div>
    </>
  );
  } catch (error) {
    redirect('/');
  }
}

export default EditProductPage;
