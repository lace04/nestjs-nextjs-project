import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

function HomePage() {
  return (
    <div className='space-y-4 flex justify-between items-center'>
      <h1 className='text-4xl font-bold'>NextNestApp</h1>
      <Link href='/products/new' className={buttonVariants({ variant: 'outline' })}>New Product</Link>
    </div>
  );
}

export default HomePage;
