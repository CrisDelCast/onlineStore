// src/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User, UserDocument } from '../common/schemas/users.schema';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

const mockUser = {
  username: 'testUser',
  email: 'test@example.com',
  password: 'plainPassword', // La contraseña sin encriptar
  role: 'client', // Ajusta según tu definición de rol
};

const mockUserDocument = {
  ...mockUser,
  save: jest.fn().mockResolvedValue(mockUser), // Simulamos el método save
};

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<UserDocument>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(mockUserDocument),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('someToken'), // Simula la generación de token
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('register', () => {
    it('should hash the password and save the user', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword'); // Simula la encriptación

      const result = await authService.register(mockUser.username, mockUser.email, mockUser.password);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10); // Verifica que se llamó a bcrypt.hash
      expect(userModel.create).toHaveBeenCalledWith({
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedPassword', // Comprueba que se guarde la contraseña encriptada
      });
      expect(result).toEqual(mockUser); // Verifica que el resultado sea el mock de usuario
    });
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      // Simula el retorno de un usuario encontrado
      jest.spyOn(userModel, 'findOne').mockResolvedValue({ ...mockUserDocument, password: await bcrypt.hash(mockUser.password, 10) });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Simula la comparación de contraseñas

      const result = await authService.login(mockUser.email, mockUser.password);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: mockUser.email }); // Verifica que se llame a findOne
      expect(bcrypt.compare).toHaveBeenCalledWith(mockUser.password, mockUserDocument.password); // Verifica la comparación de contraseñas
      expect(result).toEqual({ access_token: 'someToken' }); // Comprueba que se devuelva el token
    });

    it('should throw an error for invalid credentials', async () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null); // Simula que no se encuentra el usuario

      await expect(authService.login(mockUser.email, mockUser.password)).rejects.toThrow('Invalid credentials'); // Comprueba que se lanza un error
    });
  });
});
