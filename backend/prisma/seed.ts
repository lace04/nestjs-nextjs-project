import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data
  await prisma.product.deleteMany({});
  console.log('Cleared existing products');

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Laptop Dell XPS 13',
        description: 'High-performance ultrabook with Intel Core i7',
        price: 1299.99,
        image: 'https://via.placeholder.com/300x200?text=Laptop+Dell',
      },
      {
        name: 'Magic Mouse',
        description: 'Wireless mouse with multi-touch surface',
        price: 79.99,
        image: 'https://via.placeholder.com/300x200?text=Magic+Mouse',
      },
      {
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
        price: 49.99,
        image: 'https://via.placeholder.com/300x200?text=USB-C+Hub',
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with Cherry MX switches',
        price: 189.99,
        image: 'https://via.placeholder.com/300x200?text=Mechanical+Keyboard',
      },
      {
        name: 'External SSD 1TB',
        description: 'Fast external SSD with 1050MB/s read speed',
        price: 129.99,
        image: 'https://via.placeholder.com/300x200?text=External+SSD',
      },
      {
        name: '4K Monitor',
        description: '27-inch 4K IPS monitor with USB-C',
        price: 599.99,
        image: 'https://via.placeholder.com/300x200?text=4K+Monitor',
      },
      {
        name: 'Wireless Charger',
        description: '15W wireless charging pad for smartphones',
        price: 24.99,
        image: 'https://via.placeholder.com/300x200?text=Wireless+Charger',
      },
      {
        name: 'Webcam 4K',
        description: 'Ultra HD webcam with noise-cancelling microphone',
        price: 159.99,
        image: 'https://via.placeholder.com/300x200?text=Webcam+4K',
      },
    ],
  });

  console.log(`Created ${products.count} products`);
  console.log('Database seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
