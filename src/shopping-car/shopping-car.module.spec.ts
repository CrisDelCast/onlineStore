// src/shopping-car/shopping-car.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartModule } from './shopping-car.module';
import { ShoppingCartController } from './shopping-car.controller';
import { ShoppingCartService } from './shopping-car.service';
import { getModelToken } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartSchema } from '../common/schemas/shopping-car.schema';
import { ProductoModule } from '../producto/producto.module';

describe('ShoppingCartModule', () => {
  let shoppingCartModule: TestingModule;

  beforeEach(async () => {
    shoppingCartModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'), // Asegúrate de usar tu URL de conexión correcta
        MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]), // Agrega esto para asegurar que el modelo esté disponible
        ProductoModule,
        ShoppingCartModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(shoppingCartModule).toBeDefined();
  });

  it('should provide ShoppingCartService', () => {
    const shoppingCartService = shoppingCartModule.get<ShoppingCartService>(ShoppingCartService);
    expect(shoppingCartService).toBeDefined();
  });

  it('should provide ShoppingCartController', () => {
    const shoppingCartController = shoppingCartModule.get<ShoppingCartController>(ShoppingCartController);
    expect(shoppingCartController).toBeDefined();
  });

  it('should provide the ShoppingCart model', () => {
    const shoppingCartModel = shoppingCartModule.get(getModelToken(ShoppingCart.name));
    expect(shoppingCartModel).toBeDefined();
  });
});
