// src/users/users.module.ts
<<<<<<< HEAD
=======

>>>>>>> 6bfea80c73953ad28aa216de6bec4e13dc8f2bd5
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User,UserSchema } from 'src/common/schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],  // Necesario para usar en el módulo de autenticación
})
export class UsersModule {}
