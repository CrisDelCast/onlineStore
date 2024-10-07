// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order,OrderDocument } from 'src/common/schemas/pedidos.schema';
import { ShoppingCartService } from 'src/shopping-car/shopping-car.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private shoppingCartService: ShoppingCartService
  ) {}

  async createOrder(userId: string): Promise<Order> {
    const cart = await this.shoppingCartService.getCartByUser(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error('No items in the cart to place an order.');
    }

    const order = new this.orderModel({
      user: cart.user,
      items: cart.items,
      status: 'pending'
    });

    await this.shoppingCartService.clearCart(userId);  // Limpiar el carrito
    return order.save();
  }

  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findById(orderId).populate('items.product').exec();
  }
}
