import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './pedidos.service';
import { getModelToken } from '@nestjs/mongoose';
import { ShoppingCartService } from '../shopping-car/shopping-car.service';
import { Order } from '../common/schemas/pedidos.schema';

describe('OrdersService', () => {
  let service: OrdersService;

  // Simulamos el modelo de Mongoose para la entidad Order
  const mockOrderModel = {
    findById: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };

  // Simulamos el servicio ShoppingCartService
  const mockShoppingCartService = {
    getCartByUser: jest.fn(),
    clearCart: jest.fn(),
  };

  const mockCart = {
    user: '1',
    items: [
      { product: 'Product1', quantity: 2 },
      { product: 'Product2', quantity: 1 },
    ],
  };

  const mockOrderInstance = {
    user: mockCart.user,
    items: mockCart.items,
    status: 'pending',
    save: jest.fn().mockResolvedValue({ _id: 'orderId', ...mockCart, status: 'pending' }), // Aquí definimos el método save para la instancia
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel, // Usamos el mock del modelo de Mongoose
        },
        {
          provide: ShoppingCartService,
          useValue: mockShoppingCartService, // Usamos el mock del servicio de carrito de compras
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);

    // Mock de la creación de una nueva instancia del modelo
    (mockOrderModel as any).create = jest.fn().mockImplementation(() => mockOrderInstance);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order and clear the cart', async () => {
      const userId = '1';

      // Mock de obtener carrito de compras
      mockShoppingCartService.getCartByUser.mockResolvedValue(mockCart);

      const result = await service.createOrder(userId);

      expect(mockShoppingCartService.getCartByUser).toHaveBeenCalledWith(userId);
      expect(mockOrderInstance.save).toHaveBeenCalled();
      expect(mockShoppingCartService.clearCart).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ _id: 'orderId', ...mockCart, status: 'pending' });
    });

    it('should throw an error if the cart is empty', async () => {
      const userId = '1';

      // Simulamos que el carrito está vacío
      mockShoppingCartService.getCartByUser.mockResolvedValue({ items: [] });

      await expect(service.createOrder(userId)).rejects.toThrow(
        'No items in the cart to place an order.',
      );
    });
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const orderId = 'orderId';

      // Simulamos la búsqueda de la orden por ID
      mockOrderModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockOrderInstance),
        }),
      });

      const result = await service.getOrderById(orderId);

      expect(mockOrderModel.findById).toHaveBeenCalledWith(orderId);
      expect(mockOrderModel.populate).toHaveBeenCalledWith('items.product');
      expect(result).toEqual(mockOrderInstance);
    });
  });
});
