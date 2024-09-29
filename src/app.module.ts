import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [MongooseModule.forRoot(
    'mongodb+srv://userpasword1:userpasword1@cluster0.lviys.mongodb.net/OnlineStore?retryWrites=true&w=majority&appName=Cluster0'),
     AuthModule,
     ProductoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
