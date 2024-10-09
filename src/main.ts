import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

export async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app; 
}

bootstrap();