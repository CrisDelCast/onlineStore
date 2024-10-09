import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartController } from './shopping-car.controller';
import { ShoppingCartService } from './shopping-car.service';

describe('ShoppingCartController', () => {
  let controller: ShoppingCartController;
  let service: ShoppingCartService;

  const mockShoppingCartService = {
    getCartByUser: jest.fn(),
    addItemToCart: jest.fn(),
    removeItemFromCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingCartController],
      providers: [
        {
          provide: ShoppingCartService,
          useValue: mockShoppingCartService,
        },
      ],
    }).compile();

    controller = module.get<ShoppingCartController>(ShoppingCartController);
    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCart', () => {
    it('should return cart for a given userId', async () => {
      const userId = 'user1';
      const mockCart = { items: [] }; // Simula un carrito vacío

      mockShoppingCartService.getCartByUser.mockResolvedValue(mockCart);

      const result = await controller.getCart(userId);

      expect(mockShoppingCartService.getCartByUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockCart);
    });
  });

  describe('addItem', () => {
    it('should add an item to the cart', async () => {
      const userId = 'user1';
      const productId = 'product1';
      const quantity = 2;
      const mockResponse = { success: true }; // Simula una respuesta exitosa

      mockShoppingCartService.addItemToCart.mockResolvedValue(mockResponse);

      const result = await controller.addItem(userId, productId, quantity);

      expect(mockShoppingCartService.addItemToCart).toHaveBeenCalledWith(userId, productId, quantity);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', async () => {
      const userId = 'user1';
      const productId = 'product1';
      const mockResponse = { success: true }; // Simula una respuesta exitosa

      mockShoppingCartService.removeItemFromCart.mockResolvedValue(mockResponse);

      const result = await controller.removeItem(userId, productId);

      expect(mockShoppingCartService.removeItemFromCart).toHaveBeenCalledWith(userId, productId);
      expect(result).toEqual(mockResponse);
    });
  });
});
