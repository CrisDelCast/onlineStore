// src/orders/orders.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './pedidos.module';
import { OrdersController } from './pedidos.controller';
import { OrdersService } from './pedidos.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../common/schemas/pedidos.schema';

describe('OrdersModule', () => {
  let ordersModule: TestingModule;

  beforeEach(async () => {
    ordersModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'), // Asegúrate de usar tu URL de conexión correcta
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), // Agrega esto para asegurar que el modelo esté disponible
        OrdersModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(ordersModule).toBeDefined();
  });

  it('should provide OrdersService', () => {
    const ordersService = ordersModule.get<OrdersService>(OrdersService);
    expect(ordersService).toBeDefined();
  });

  it('should provide OrdersController', () => {
    const ordersController = ordersModule.get<OrdersController>(OrdersController);
    expect(ordersController).toBeDefined();
  });

  it('should provide the Order model', () => {
    const orderModel = ordersModule.get(getModelToken(Order.name));
    expect(orderModel).toBeDefined();
  });
});
