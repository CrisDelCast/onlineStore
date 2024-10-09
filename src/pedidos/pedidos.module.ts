// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './pedidos.service';
import { OrdersController } from './pedidos.controller';
import { Order,OrderSchema } from '../common/schemas/pedidos.schema';
import { ShoppingCartModule } from '../shopping-car/shopping-car.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ShoppingCartModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports : [OrdersService]
})
export class OrdersModule {}
