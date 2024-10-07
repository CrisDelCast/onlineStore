import { Test, TestingModule } from '@nestjs/testing';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dtos/crear-produto.dto';

describe('ProductoController', () => {
  let controller: ProductoController;
  let productoService: ProductoService;

  const mockProductoService = {
    create: jest.fn((crearProductoDto: CrearProductoDto) => {
      // Implement your mock logic here, e.g., return a sample product object
      return Promise.resolve({
        _id: '123',
        name: crearProductoDto.name,
        description: crearProductoDto.description,
        price: crearProductoDto.price,
        stock: crearProductoDto.stock,
      });
    }),
    findOne: jest.fn((id: string) => {
      // Implement your mock logic here, e.g., return a sample product object based on the ID
      return Promise.resolve({
        _id: id,
        name: 'Producto de prueba',
        description: 'Descripción del producto',
        price: 100,
        stock: 5,
      });
    }),
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
    productoService = module.get<ProductoService>(ProductoService);
  });

  it('should create a new product', async () => {
    const crearProductoDto: CrearProductoDto = {
      name: 'Producto de prueba',
      description: 'Descripción del producto',
      price: 100,
      stock: 5,
    };

    const createdProduct = await controller.create(crearProductoDto);

    expect(createdProduct).toEqual({
      _id: '123',
      name: 'Producto de prueba',
      description: 'Descripción del producto',
      price: 100,
      stock: 5,
    });
  });

  it('should find a product by ID', async () => {
    const foundProduct = await controller.findOne('123');

    expect(foundProduct).toEqual({
      _id: '123',
      name: 'Producto de prueba',
      description: 'Descripción del producto',
      price: 100,
      stock: 5,
    });
  });
});