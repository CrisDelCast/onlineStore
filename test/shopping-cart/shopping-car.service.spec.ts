import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingCarService } from '../../src/shopping-car/shopping-car.service';
import { ProductoService } from 'src/producto/producto.service';
import { Cart, CartItem } from '../../src/shopping-car/entities/car.entity';

const mockProductoService = {
  findOne: jest.fn(),
};

describe('ShoppingCarService', () => {
  let service: ShoppingCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCarService,
        {
          provide: ProductoService,
          useValue: mockProductoService,
        },
      ],
    }).compile();

    service = module.get<ShoppingCarService>(ShoppingCarService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCart', () => {
    it('should return an empty cart for a new user', () => {
      const cart = service.getCart('user1');
      expect(cart).toEqual(new Cart('user1')); // Asegúrate de que Cart tiene un constructor que acepta userId
      expect(cart.items).toEqual([]);
      expect(cart.totalPrice).toBe(0);
    });

    it('should return the existing cart for a user', () => {
      const cart = new Cart('user1');
      cart.items = [{ productId: 'product1', quantity: 2 }];
      cart.totalPrice = 20;
      service['carts'].set('user1', cart);

      const returnedCart = service.getCart('user1');
      expect(returnedCart).toEqual(cart);
    });
  });

  describe('addItem', () => {
    it('should add a new product to the cart', async () => {
      mockProductoService.findOne.mockResolvedValue({ price: 10 }); // Simular el precio del producto
      const cart = await service.addItem('user1', 'product1', 2);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({ productId: 'product1', quantity: 2 });
      expect(cart.totalPrice).toBe(20); // 2 * 10
    });

    it('should increase quantity for an existing product', async () => {
      mockProductoService.findOne.mockResolvedValue({ price: 10 }); // Simular el precio del producto
      await service.addItem('user1', 'product1', 2); // Agregar el producto inicialmente
      const cart = await service.addItem('user1', 'product1', 3); // Aumentar la cantidad

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({ productId: 'product1', quantity: 5 }); // Debería ser 2 + 3
      expect(cart.totalPrice).toBe(50); // 5 * 10
    });
  });

  describe('removeItem', () => {
    it('should remove a product from the cart', async () => {
      mockProductoService.findOne.mockResolvedValue({ price: 10 }); // Simular el precio del producto
      await service.addItem('user1', 'product1', 2); // Agregar el producto inicialmente
      const cart = await service.removeItem('user1', 'product1'); // Eliminar el producto

      expect(cart.items).toHaveLength(0);
      expect(cart.totalPrice).toBe(0);
    });

    it('should not remove a product that does not exist', async () => {
      mockProductoService.findOne.mockResolvedValue({ price: 10 });
      const cart = await service.removeItem('user1', 'product1'); // Intentar eliminar un producto que no está en el carrito

      expect(cart.items).toHaveLength(0);
      expect(cart.totalPrice).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should clear the cart for a user', () => {
      const cart = new Cart('user1');
      service['carts'].set('user1', cart); // Agregar un carrito para el usuario
      service.clearCart('user1');

      const returnedCart = service.getCart('user1');
      expect(returnedCart).toEqual(new Cart('user1')); // El carrito debe estar vacío
    });
  });
});
