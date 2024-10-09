import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

describe('CategoriasController', () => {
  let controller: CategoriasController;

  const categorias = [
    { id: '1', name: 'Category 1', description: 'Description 1' },
    { id: '2', name: 'Category 2', description: 'Description 2' },
  ];

  const mockCategoriasService = {
    createCategory: jest.fn((name, description) => ({ id: Math.floor(Math.random() * 100), name, description })),
    getCategories: jest.fn(() => categorias),
    getCategoryById: jest.fn((id) => categorias.find(category => category.id === id)),
    updateCategory: jest.fn((id, name, description) => ({ id, name, description })),
    deleteCategory: jest.fn((id) => categorias.find(category => category.id === id)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasController],
      providers: [{ provide: CategoriasService, useValue: mockCategoriasService }],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: jest.fn(() => true) })  // Mock JWT guard
    .compile();

    controller = module.get<CategoriasController>(CategoriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const dto = { name: 'New Category', description: 'New Description' };

    expect(await controller.createCategory(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockCategoriasService.createCategory).toHaveBeenCalledWith(dto.name, dto.description);
    expect(mockCategoriasService.createCategory).toHaveBeenCalledTimes(1);
  });

  it('should return all categories', async () => {
    expect(await controller.getCategories()).toEqual(categorias);
    expect(mockCategoriasService.getCategories).toHaveBeenCalledTimes(1);
  });

  it('should return a category by id', async () => {
    const categoryId = '1';
    expect(await controller.getCategoryById(categoryId)).toEqual(categorias[0]);
    expect(mockCategoriasService.getCategoryById).toHaveBeenCalledWith(categoryId);
    expect(mockCategoriasService.getCategoryById).toHaveBeenCalledTimes(1);
  });

  it('should update a category', async () => {
    const categoryId = '1';
    const dto = { name: 'Updated Category', description: 'Updated Description' };

    expect(await controller.updateCategory(categoryId, dto)).toEqual({ id: categoryId, ...dto });
    expect(mockCategoriasService.updateCategory).toHaveBeenCalledWith(categoryId, dto.name, dto.description);
    expect(mockCategoriasService.updateCategory).toHaveBeenCalledTimes(1);
  });

  it('should delete a category', async () => {
    const categoryId = '1';
    expect(await controller.deleteCategory(categoryId)).toEqual(categorias[0]);
    expect(mockCategoriasService.deleteCategory).toHaveBeenCalledWith(categoryId);
    expect(mockCategoriasService.deleteCategory).toHaveBeenCalledTimes(1);
  });
});
