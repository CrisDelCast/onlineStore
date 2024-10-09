// src/producto/producto.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductoModule } from './producto.module';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { getModelToken } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from '../common/schemas/producto.schema';

describe('ProductoModule', () => {
  let productoModule: TestingModule;

  beforeEach(async () => {
    productoModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'), 
        MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
        ProductoModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(productoModule).toBeDefined();
  });

  it('should provide ProductoService', () => {
    const productoService = productoModule.get<ProductoService>(ProductoService);
    expect(productoService).toBeDefined();
  });

  it('should provide ProductoController', () => {
    const productoController = productoModule.get<ProductoController>(ProductoController);
    expect(productoController).toBeDefined();
  });

  it('should provide the Producto model', () => {
    const productoModel = productoModule.get(getModelToken(Producto.name));
    expect(productoModel).toBeDefined();
  });
});
