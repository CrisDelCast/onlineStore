import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ShoppingCarController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/shopping-car/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/shopping-car/1') // Reemplaza con un ID de usuario válido
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('items'); // Ajusta esto según la estructura de tu respuesta
        expect(res.body).toHaveProperty('totalPrice'); // Ajusta esto según la estructura de tu respuesta
      });
  });

  it('/shopping-car/add-item (POST)', () => {
    return request(app.getHttpServer())
      .post('/shopping-car/add-item')
      .send({
        userId: 1, // Reemplaza con un ID de usuario válido
        productId: 2, // Reemplaza con un ID de producto válido
        quantity: 3, // Ajusta según tus necesidades
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('message', 'Item added to cart'); // Ajusta esto según tu respuesta
      });
  });

  // Agrega más pruebas según sea necesario
});
