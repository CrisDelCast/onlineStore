import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { Producto } from '../common/schemas/producto.schema';

describe('ProductoController', () => {
  let controller: ProductoController;
  let service: ProductoService;

  const mockProductoService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockProducto: Producto = {
    id: '1',
    name: 'Producto 1',
    price: 100,
    stock: 20
    // Agrega otros campos según tu esquema de Producto
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [
        {
          provide: ProductoService,
          useValue: mockProductoService,
        },
      ],
    }).compile();

    controller = module.get<ProductoController>(ProductoController);
    service = module.get<ProductoService>(ProductoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const crearProductoDto: CrearProductoDto = {
        name: 'Nuevo Producto',
        price: 150,
        stock:35
        // Agrega otros campos necesarios
      };

      mockProductoService.create.mockResolvedValue(mockProducto);

      const result = await controller.create(crearProductoDto);

      expect(mockProductoService.create).toHaveBeenCalledWith(crearProductoDto);
      expect(result).toEqual(mockProducto);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const productId = '1';
      mockProductoService.findOne.mockResolvedValue(mockProducto);

      const result = await controller.findOne(productId);

      expect(mockProductoService.findOne).toHaveBeenCalledWith(productId);
      expect(result).toEqual(mockProducto);
    });

    it('should throw an error if the product is not found', async () => {
      const productId = '2';
      mockProductoService.findOne.mockResolvedValue(null); // Simula que no se encontró el producto

      await expect(controller.findOne(productId)).rejects.toThrowError();
    });
  });
});
