import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../common/schemas/users.schema';
import { CreateUserDto } from './dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let model: any;

  const mockUserModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', email: 'test@example.com', password: 'password' };
      const createdUser = { id: '1', ...createUserDto };

      model.create.mockResolvedValue(createdUser);

      expect(await service.create(createUserDto)).toEqual(createdUser);
      expect(model.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { id: '1', username: 'testuser', email };

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      expect(await service.findOneByEmail(email)).toEqual(user);
      expect(model.findOne).toHaveBeenCalledWith({ email });
    });

    it('should return undefined if no user found', async () => {
      const email = 'nonexistent@example.com';

      model.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      expect(await service.findOneByEmail(email)).toBeUndefined();
    });
  });

  describe('findOneById', () => {
    it('should return a user by ID', async () => {
      const userId = '1';
      const user = { id: userId, username: 'testuser', email: 'test@example.com' };

      model.findById.mockResolvedValue(user);

      expect(await service.findOneById(userId)).toEqual(user);
      expect(model.findById).toHaveBeenCalledWith(userId);
    });

    it('should return undefined if no user found', async () => {
      const userId = 'nonexistent-id';

      model.findById.mockResolvedValue(undefined);

      expect(await service.findOneById(userId)).toBeUndefined();
    });
  });
});
