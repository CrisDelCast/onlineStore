import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasService } from './categorias.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from '../common/schemas/categorias.schema';
import { Model } from 'mongoose';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let model: Model<Category>;

  const mockCategory = {
    _id: '1',
    name: 'Category 1',
    description: 'Description for category 1',
    save: jest.fn().mockResolvedValue(this),
  };

  const mockCategoryModel = {
    // Simulamos los métodos que necesitas
    create: jest.fn().mockResolvedValue(mockCategory),
    find: jest.fn().mockResolvedValue([mockCategory]),
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
          useValue: mockCategoryModel, // Usamos el mock del modelo
        },
      ],
    }).compile();

    service = module.get<CategoriasService>(CategoriasService);
    model = module.get<Model<Category>>(getModelToken(Category.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const name = 'Category 1';
    const description = 'Description for category 1';

    // No necesitamos spyOn aquí, solo usamos el mock directamente
    const result = await service.createCategory(name, description);
    expect(result).toEqual(mockCategory);
    expect(mockCategoryModel.create).toHaveBeenCalledWith({ name, description });
  });

  it('should return all categories', async () => {
    const result = await service.getCategories();
    expect(result).toEqual([mockCategory]);
    expect(mockCategoryModel.find).toHaveBeenCalled();
  });

  it('should return a category by id', async () => {
    const categoryId = '1';
    const result = await service.getCategoryById(categoryId);
    expect(result).toEqual(mockCategory);
    expect(mockCategoryModel.findById).toHaveBeenCalledWith(categoryId);
  });

  it('should update a category', async () => {
    const categoryId = '1';
    const name = 'Updated Category 1';
    const description = 'Updated description for category 1';
    const result = await service.updateCategory(categoryId, name, description);
    expect(result).toEqual(mockCategory);
    expect(mockCategoryModel.findByIdAndUpdate).toHaveBeenCalledWith(categoryId, { name, description }, { new: true });
  });

  it('should delete a category', async () => {
    const categoryId = '1';
    const result = await service.deleteCategory(categoryId);
    expect(result).toEqual(mockCategory);
    expect(mockCategoryModel.findByIdAndDelete).toHaveBeenCalledWith(categoryId);
  });
});
