import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from '../common/schemas/producto.schema';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';

describe('ProductoService', () => {
  let service: ProductoService;
  let model: Model<Producto>;

  const mockProducto = {
    id: '1',
    nombre: 'Producto 1',
    stock: 10,
    price:90
  };

  const mockProductoModel = {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductoService,
        {
          provide: getModelToken(Producto.name),
          useValue: mockProductoModel,
        },
      ],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    model = module.get<Model<Producto>>(getModelToken(Producto.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product if it does not exist', async () => {
      const crearProductoDto: CrearProductoDto = {
        name: 'Nuevo Producto',
        stock: 5,
        price:300
      };

      mockProductoModel.findOne.mockResolvedValue(null); // Simula que no existe el producto
      mockProductoModel.save.mockResolvedValue(mockProducto); // Simula que se guarda el producto

      const result = await service.create(crearProductoDto);

      expect(mockProductoModel.findOne).toHaveBeenCalledWith({ nombre: crearProductoDto.name });
      expect(mockProductoModel.save).toHaveBeenCalled();
      expect(result).toEqual(mockProducto);
    });

    it('should update stock if product already exists', async () => {
      const crearProductoDto: CrearProductoDto = {
        name: 'Producto 1',
        stock: 5,
        price:170

      };

      mockProductoModel.findOne.mockResolvedValue(mockProducto); // Simula que existe el producto
      mockProductoModel.save.mockResolvedValue(mockProducto); // Simula que se guarda el producto

      const result = await service.create(crearProductoDto);

      expect(mockProductoModel.findOne).toHaveBeenCalledWith({ nombre: crearProductoDto.name });
      expect(mockProducto.stock).toBe(15); // Verifica que se suma el stock
      expect(mockProductoModel.save).toHaveBeenCalled();
      expect(result).toEqual(mockProducto);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductoDto: UpdateProductoDto = {
        name: 'Producto Actualizado',
        stock: 20,
        price:80
        // Agrega otros campos necesarios
      };

      mockProductoModel.findByIdAndUpdate.mockResolvedValue({ ...mockProducto, ...updateProductoDto });

      const result = await service.update('1', updateProductoDto);

      expect(mockProductoModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updateProductoDto, { new: true });
      expect(result).toEqual({ ...mockProducto, ...updateProductoDto });
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts = [mockProducto];

      mockProductoModel.find.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(mockProductoModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductoModel.findById.mockResolvedValue(mockProducto);

      const result = await service.findOne('1');

      expect(mockProductoModel.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProducto);
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      mockProductoModel.findByIdAndDelete.mockResolvedValue(mockProducto);

      const result = await service.delete('1');

      expect(mockProductoModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockProducto);
    });
  });
});
