import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCartService } from './shopping-car.service';
import { getModelToken } from '@nestjs/mongoose';
import { ShoppingCart } from '../common/schemas/shopping-car.schema';
import { Types } from 'mongoose';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let shoppingCartModel;

  const mockShoppingCartModel = {
    findOne: jest.fn(),
    findOneAndDelete: jest.fn(),
    save: jest.fn(),
    populate: jest.fn(),
    exec: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        {
          provide: getModelToken(ShoppingCart.name),
          useValue: mockShoppingCartModel,
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
    shoppingCartModel = module.get(getModelToken(ShoppingCart.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCartByUser', () => {
    it('should return the cart for a given userId', async () => {
      const userId = 'user1';
      const mockCart = {
        user: userId,
        items: [],
        populate: jest.fn().mockReturnThis(),
      };

      shoppingCartModel.findOne.mockResolvedValue(mockCart);
      mockCart.populate.mockResolvedValue(mockCart); // Simula el populate

      const result = await service.getCartByUser(userId);

      expect(shoppingCartModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(result).toEqual(mockCart);
    });
  });

  describe('addItemToCart', () => {
    it('should add an item to an existing cart', async () => {
      const userId = 'user1';
      const productId = 'product1';
      const quantity = 2;
      const mockCart = {
        user: userId,
        items: [{ product: new Types.ObjectId(productId), quantity: 1 }],
        save: jest.fn(),
      };

      shoppingCartModel.findOne.mockResolvedValue(mockCart);
      
      const result = await service.addItemToCart(userId, productId, quantity);

      expect(shoppingCartModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(mockCart.items[0].quantity).toBe(3); // Verificamos que la cantidad se haya actualizado
      expect(result).toEqual(mockCart);
      expect(mockCart.save).toHaveBeenCalled();
    });

    it('should create a new cart if none exists', async () => {
      const userId = 'user1';
      const productId = 'product1';
      const quantity = 2;

      shoppingCartModel.findOne.mockResolvedValue(null); // Simulamos que no existe el carrito
      shoppingCartModel.save.mockResolvedValue({ user: userId, items: [{ product: new Types.ObjectId(productId), quantity }] });

      const result = await service.addItemToCart(userId, productId, quantity);

      expect(shoppingCartModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(result).toHaveProperty('user', userId);
      expect(result.items.length).toBe(1);
      expect(result.items[0].quantity).toBe(quantity);
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove an item from the cart', async () => {
      const userId = 'user1';
      const productId = 'product1';
      const mockCart = {
        user: userId,
        items: [{ product: new Types.ObjectId(productId), quantity: 2 }],
        save: jest.fn(),
      };

      shoppingCartModel.findOne.mockResolvedValue(mockCart);
      
      const result = await service.removeItemFromCart(userId, productId);

      expect(shoppingCartModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(mockCart.items.length).toBe(0); // El producto ha sido eliminado
      expect(result).toEqual(mockCart);
      expect(mockCart.save).toHaveBeenCalled();
    });

    it('should return null if no cart exists', async () => {
      const userId = 'user1';
      const productId = 'product1';

      shoppingCartModel.findOne.mockResolvedValue(null); // Simulamos que no existe el carrito

      const result = await service.removeItemFromCart(userId, productId);

      expect(shoppingCartModel.findOne).toHaveBeenCalledWith({ user: userId });
      expect(result).toBeNull();
    });
  });

  describe('clearCart', () => {
    it('should clear the cart for a given userId', async () => {
      const userId = 'user1';
      
      shoppingCartModel.findOneAndDelete.mockResolvedValue(true); // Simulamos que el carrito ha sido eliminado

      await service.clearCart(userId);

      expect(shoppingCartModel.findOneAndDelete).toHaveBeenCalledWith({ user: userId });
    });
  });
});
