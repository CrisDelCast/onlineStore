// src/orders/orders.controller.ts
import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './pedidos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createOrder(@Body('userId') userId: string) {
    return this.ordersService.createOrder(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }
}
