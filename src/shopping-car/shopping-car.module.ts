
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCartService } from './shopping-car.service';
import { ShoppingCartController } from './shopping-car.controller';
import { ShoppingCart,ShoppingCartSchema } from 'src/common/schemas/shopping-car.schema';
import { ProductoModule } from '../producto/producto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
    ProductoModule,
  ],
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
