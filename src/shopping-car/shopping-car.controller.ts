// src/shopping-cart/shopping-cart.controller.ts
import { Controller, Post, Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-car.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.shoppingCartService.getCartByUser(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addItem(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number
  ) {
    return this.shoppingCartService.addItemToCart(userId, productId, quantity);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('remove')
  async removeItem(
    @Body('userId') userId: string,
    @Body('productId') productId: string
  ) {
    return this.shoppingCartService.removeItemFromCart(userId, productId);
  }
}
