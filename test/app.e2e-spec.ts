import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap } from '../src/main';

describe('Pruebas E2E para la app', () => {
  let app: INestApplication;

  // Antes de todas las pruebas, inicializamos la aplicación
  beforeAll(async () => {
    app = await bootstrap();  // Obtenemos la instancia de la app
  });

  // Prueba de ejemplo para el endpoint raíz
  it('/ (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World');  // Ajusta según tu respuesta esperada
  });

  // Después de todas las pruebas, cerramos la aplicación
  afterAll(async () => {
    await app.close();
  });
});
