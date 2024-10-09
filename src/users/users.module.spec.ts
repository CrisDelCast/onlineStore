// src/users/users.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from 'src/common/schemas/users.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersModule', () => {
  let usersModule: TestingModule;

  beforeEach(async () => {
    usersModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'), // Asegúrate de usar tu URL de conexión correcta
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Asegúrate de incluir el modelo
        UsersModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(usersModule).toBeDefined();
  });

  it('should provide UsersService', () => {
    const usersService = usersModule.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });

  it('should provide UsersController', () => {
    const usersController = usersModule.get<UsersController>(UsersController);
    expect(usersController).toBeDefined();
  });

  it('should provide the User model', () => {
    const userModel = usersModule.get(getModelToken(User.name));
    expect(userModel).toBeDefined();
  });
});
