// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.model'; // Importa la interfaz y el esquema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Registra el modelo
  ],
  providers: [UsersService],
  controllers: [UsersController], // Controlador registrado
  exports: [UsersService], // Exportar el servicio
})
export class UsersModule {}
