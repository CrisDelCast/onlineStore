// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserRole } from '../common/schemas/users.schema'; // Importa User y UserRole

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should call authService.register with the correct parameters and return a User', async () => {
      const body = { username: 'testUser', email: 'test@example.com', password: 'testPassword' };
      
      // Simula un objeto User como retorno, incluyendo el rol
      const mockUser: User = {
        username: body.username,
        email: body.email,
        password: body.password,
        role: UserRole.CLIENT, // Establece el rol predeterminado
      } as User; // Usa 'as User' para asegurar el tipo

      jest.spyOn(authService, 'register').mockResolvedValue(mockUser);

      expect(await authController.register(body)).toBe(mockUser);
      expect(authService.register).toHaveBeenCalledWith(body.username, body.email, body.password);
    });
  });

  describe('login', () => {
    it('should call authService.login with the correct parameters and return the token', async () => {
      const body = { email: 'test@example.com', password: 'testPassword' };
      const result = { access_token: 'someToken' }; // Ajusta la propiedad a 'access_token'

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(body)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(body.email, body.password);
    });
  });
});
