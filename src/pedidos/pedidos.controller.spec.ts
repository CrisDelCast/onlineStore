import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './pedidos.controller';
import { OrdersService } from './pedidos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces/features/can-activate.interface';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  // Simulamos el servicio OrdersService
  const mockOrdersService = {
    createOrder: jest.fn((userId: string) => ({
      id: '1',
      userId,
      items: [],
      totalPrice: 100,
    })),
    getOrderById: jest.fn((orderId: string) => ({
      id: orderId,
      userId: '1',
      items: [],
      totalPrice: 100,
    })),
  };

  // Simulamos el JwtAuthGuard
  const mockJwtAuthGuard: CanActivate = {
    canActivate: jest.fn((context: ExecutionContext) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService, // Usamos el mock del servicio
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Sobreescribimos el guardia
      .useValue(mockJwtAuthGuard) // Usamos el mock del guardia
      .compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const userId = '1';
      const result = await controller.createOrder(userId);
      expect(result).toEqual({
        id: '1',
        userId,
        items: [],
        totalPrice: 100,
      });
      expect(service.createOrder).toHaveBeenCalledWith(userId);
    });
  });

  describe('getOrder', () => {
    it('should return an order by id', async () => {
      const orderId = '1';
      const result = await controller.getOrder(orderId);
      expect(result).toEqual({
        id: orderId,
        userId: '1',
        items: [],
        totalPrice: 100,
      });
      expect(service.getOrderById).toHaveBeenCalledWith(orderId);
    });
  });
});
