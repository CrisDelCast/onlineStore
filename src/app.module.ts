import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CategoriasController } from './categorias/categorias.controller';
import { ProductoController } from './producto/producto.controller';
import { ShoppingCartController } from './shopping-car/shopping-car.controller';
import { ShoppingCartModule } from './shopping-car/shopping-car.module';
import { ShoppingCartService } from './shopping-car/shopping-car.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './pedidos/pedidos.module';
import { OrdersController } from './pedidos/pedidos.controller';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://userpasword1:userpasword1@cluster0.lviys.mongodb.net/OnlineStore?retryWrites=true&w=majority&appName=Cluster0'),
     AuthModule,
     ProductoModule,
     CategoriasModule,
     ShoppingCartModule,
     UsersModule,
     OrdersModule],
  controllers: [AppController, CategoriasController,ProductoController, ShoppingCartController,OrdersController],
  providers: [AppService],
})
export class AppModule { }
