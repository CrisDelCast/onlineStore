import { Module } from '@nestjs/common';
import { ShoppingCarController } from './shopping-car.controller';
import { ShoppingCarService } from './shopping-car.service';
import { ProductoModule } from 'src/producto/producto.module';

@Module({
  imports: [ProductoModule],
  controllers: [ShoppingCarController],
  providers: [ShoppingCarService]
})
export class ShoppingCarModule {}
