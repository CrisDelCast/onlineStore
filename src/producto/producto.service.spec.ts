import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { Model } from 'mongoose';
import { Producto } from '../common/schemas/producto.schema';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';

const mockProductoModel = {
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
};

describe('ProductoService', () => {
  let productoService: ProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoService,
        {
          provide: Model,
          useValue: mockProductoModel,
        },
      ],
    }).compile();

    productoService = module.get<ProductoService>(ProductoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new product when it does not exist', async () => {
      const newProducto: CrearProductoDto = {
        name: 'Producto Nuevo',
        description: 'Descripción del producto',
        price: 100,
        stock: 5
      };

      mockProductoModel.findOne.mockReturnValueOnce(Promise.resolve(null)); // No existing product

      const createdProducto = await productoService.create(newProducto);

      expect(mockProductoModel.save).toHaveBeenCalledTimes(1);
      expect(createdProducto).toEqual(newProducto); // Assuming Producto model reflects DTO structure
    });

    it('should update stock of an existing product', async () => {
      const existingProducto = {
        _id: '123',
        nombre: 'Producto Existente',
        stock: 10,
      };
      const updateProducto: CrearProductoDto = {
        name: 'Producto Existente', // Same name as existing
        stock: 5,
        price: 3,
      };

      mockProductoModel.findOne.mockReturnValueOnce(Promise.resolve(existingProducto));

      const updatedProducto = await productoService.create(updateProducto);

      expect(mockProductoModel.save).toHaveBeenCalledTimes(1);
      expect(updatedProducto.stock).toBe(existingProducto.stock + updateProducto.stock);
    });
  });

  describe('update', () => {
    it('should update a product by ID', async () => {
      const id = '123';
      const updateDto: UpdateProductoDto = {
        name: 'Producto Actualizado',
        price: 120,
        stock: 5
      };

      mockProductoModel.findByIdAndUpdate.mockReturnValueOnce(Promise.resolve({ ...updateDto, _id: id }));

      const updatedProducto = await productoService.update(id, updateDto);

      expect(mockProductoModel.findByIdAndUpdate).toHaveBeenCalledWith(id, updateDto, { new: true });
      expect(updatedProducto).toEqual({ ...updateDto, _id: id });
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      const products = [
        { _id: '1', nombre: 'Producto 1' },
        { _id: '2', nombre: 'Producto 2' },
      ];

      mockProductoModel.find.mockReturnValueOnce(Promise.resolve(products));

      const foundProducts = await productoService.findAll();

      expect(mockProductoModel.find).toHaveBeenCalledTimes(1);
      expect(foundProducts).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should find a product by ID', async () => {
      const id = '123';
      const product = { _id: id, nombre: 'Producto' };

      mockProductoModel.findById.mockReturnValueOnce(Promise.resolve(product));

      const foundProduct = await productoService.findOne(id);

      expect(mockProductoModel.findById).toHaveBeenCalledWith(id);
      expect(foundProduct).toEqual(product);
    });
  });
});