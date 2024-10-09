import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findOneById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', email: 'test@example.com', password: 'password' };
      const result = { id: '1', ...createUserDto }; // Simula el resultado de la creación

      mockUsersService.create.mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toEqual(result);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = '1';
      const result = { id: userId, username: 'testuser', email: 'test@example.com' }; // Simula un usuario encontrado

      mockUsersService.findOneById.mockResolvedValue(result);

      expect(await controller.findOne(userId)).toEqual(result);
      expect(mockUsersService.findOneById).toHaveBeenCalledWith(userId);
    });
  });
});
