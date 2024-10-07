import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from '../../src/categorias/categorias.service';
import { getModelToken } from '@nestjs/mongoose'; // Importa este token
import { Model } from 'mongoose'; // Para crear un mock del modelo
import { Category } from 'src/common/schemas/categorias.schema'; // Asegúrate de que la ruta sea correcta

describe('CategoriasService', () => {
  let service: CategoriasService;
  let categoryModel: Model<Category>;

  const mockCategory = { id: '1', name: 'Electronics', description: 'Electronic items' };
  
  const mockCategoryModel = {
    create: jest.fn().mockResolvedValue(mockCategory),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockCategory]),
    }),
    findById: jest.fn().mockResolvedValue(mockCategory),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockCategory),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockCategory),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriasService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const category = await service.createCategory('Electronics', 'Electronic items');
      expect(category).toEqual(mockCategory);
      expect(categoryModel.create).toHaveBeenCalledWith({ name: 'Electronics', description: 'Electronic items' });
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categories = await service.getCategories();
      expect(categories).toEqual([mockCategory]);
      expect(categoryModel.find).toHaveBeenCalled();
    });
  });

  describe('getCategoryById', () => {
    it('should return a category by ID', async () => {
      const category = await service.getCategoryById('1');
      expect(category).toEqual(mockCategory);
      expect(categoryModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateCategory', () => {
    it('should update a category', async () => {
      const updatedCategory = await service.updateCategory('1', 'Updated Name', 'Updated Description');
      expect(updatedCategory).toEqual(mockCategory);
      expect(categoryModel.findByIdAndUpdate).toHaveBeenCalledWith('1', { name: 'Updated Name', description: 'Updated Description' }, { new: true });
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category', async () => {
      const deletedCategory = await service.deleteCategory('1');
      expect(deletedCategory).toEqual(mockCategory);
      expect(categoryModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
