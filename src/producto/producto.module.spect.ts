import { Test, TestingModule } from '@nestjs/testing';
import { ProductoModule } from './producto.module';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

describe('ProductoModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProductoModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide ProductoService', () => {
    const productoService = module.get<ProductoService>(ProductoService);
    expect(productoService).toBeDefined();
  });

  it('should provide ProductoController', () => {
    const productoController = module.get<ProductoController>(ProductoController);
    expect(productoController).toBeDefined();
  });
});