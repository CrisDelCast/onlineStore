import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';

describe('CategoriasController', () => {
  let controller: CategoriasController;
  let service: CategoriasService;

  const mockCategory = { id: '1', name: 'Electronics', description: 'Electronic items' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [
        {
          provide: CategoriasService,
          useValue: {
            createCategory: jest.fn().mockResolvedValue(mockCategory),
            getCategories: jest.fn().mockResolvedValue([mockCategory]),
            getCategoryById: jest.fn().mockResolvedValue(mockCategory),
            updateCategory: jest.fn().mockResolvedValue(mockCategory),
            deleteCategory: jest.fn().mockResolvedValue(mockCategory),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriasController>(CategoriasController);
    service = module.get<CategoriasService>(CategoriasService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const result = await controller.createCategory({ name: 'Electronics', description: 'Electronic items' });
      expect(result).toEqual(mockCategory);
      expect(service.createCategory).toHaveBeenCalledWith('Electronics', 'Electronic items');
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const result = await controller.getCategories();
      expect(result).toEqual([mockCategory]);
      expect(service.getCategories).toHaveBeenCalled();
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by ID', async () => {
      const result = await controller.getCategoryById('1');
      expect(result).toEqual(mockCategory);
      expect(service.getCategoryById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const result = await controller.updateCategory('1', { name: 'Updated Name', description: 'Updated Description' });
      expect(result).toEqual(mockCategory);
      expect(service.updateCategory).toHaveBeenCalledWith('1', 'Updated Name', 'Updated Description');
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const result = await controller.deleteCategory('1');
      expect(result).toEqual(mockCategory);
      expect(service.deleteCategory).toHaveBeenCalledWith('1');
    });
  });
});
