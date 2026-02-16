import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Products API (e2e)', () => {
  let app: INestApplication<App>;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api');
    await app.init();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    // Clean database before tests
    await prismaService.product.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/products', () => {
    it('should create a product', () => {
      return request(app.getHttpServer())
        .post('/api/products')
        .send({
          name: 'Test Product',
          description: 'Test Description',
          price: 99.99,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe('Test Product');
          expect(res.body.price).toBe(99.99);
        });
    });

    it('should fail with invalid data', () => {
      return request(app.getHttpServer())
        .post('/api/products')
        .send({
          name: '',
          price: -10,
        })
        .expect(400);
    });

    it('should fail with missing required fields', () => {
      return request(app.getHttpServer())
        .post('/api/products')
        .send({
          description: 'Missing name and price',
        })
        .expect(400);
    });
  });

  describe('GET /api/products', () => {
    beforeAll(async () => {
      await prismaService.product.createMany({
        data: [
          { name: 'Product 1', price: 100 },
          { name: 'Product 2', price: 200 },
          { name: 'Product 3', price: 300 },
        ],
      });
    });

    it('should return all products with default pagination', () => {
      return request(app.getHttpServer())
        .get('/api/products')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('should return products with custom pagination', () => {
      return request(app.getHttpServer())
        .get('/api/products?skip=0&take=2')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeLessThanOrEqual(2);
        });
    });
  });

  describe('GET /api/products/:id', () => {
    let productId: number;

    beforeAll(async () => {
      const product = await prismaService.product.create({
        data: { name: 'Find Me', price: 150 },
      });
      productId = product.id;
    });

    it('should return a product by id', () => {
      return request(app.getHttpServer())
        .get(`/api/products/${productId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(productId);
          expect(res.body.name).toBe('Find Me');
        });
    });

    it('should return 404 for non-existent product', () => {
      return request(app.getHttpServer())
        .get('/api/products/99999')
        .expect(404);
    });
  });

  describe('PATCH /api/products/:id', () => {
    let productId: number;

    beforeAll(async () => {
      const product = await prismaService.product.create({
        data: { name: 'Update Me', price: 50 },
      });
      productId = product.id;
    });

    it('should update a product', () => {
      return request(app.getHttpServer())
        .patch(`/api/products/${productId}`)
        .send({ name: 'Updated Product', price: 150 })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe('Updated Product');
          expect(res.body.price).toBe(150);
        });
    });

    it('should partially update a product', () => {
      return request(app.getHttpServer())
        .patch(`/api/products/${productId}`)
        .send({ price: 200 })
        .expect(200)
        .expect((res) => {
          expect(res.body.price).toBe(200);
        });
    });

    it('should return 404 for non-existent product', () => {
      return request(app.getHttpServer())
        .patch('/api/products/99999')
        .send({ name: 'Test' })
        .expect(404);
    });
  });

  describe('DELETE /api/products/:id', () => {
    let productId: number;

    beforeAll(async () => {
      const product = await prismaService.product.create({
        data: { name: 'Delete Me', price: 25 },
      });
      productId = product.id;
    });

    it('should delete a product', () => {
      return request(app.getHttpServer())
        .delete(`/api/products/${productId}`)
        .expect(200);
    });

    it('should return 404 for non-existent product', () => {
      return request(app.getHttpServer())
        .delete('/api/products/99999')
        .expect(404);
    });
  });
});
