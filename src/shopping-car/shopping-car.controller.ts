import { ShoppingCarService } from './shopping-car.service';
import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cart')
export class ShoppingCarController {
  constructor(private readonly shoppingCartService: ShoppingCarService) {}

  // Obtener el carrito del usuario
  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.shoppingCartService.getCart(userId);
  }

  // Agregar un producto al carrito
  @Post(':userId')
  addItem(
    @Param('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.shoppingCartService.addItem(userId, productId, quantity);
  }

  // Eliminar un producto del carrito
  @Delete(':userId/:productId')
  removeItem(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.shoppingCartService.removeItem(userId, productId);
  }

  // Limpiar el carrito
  @Delete(':userId')
  clearCart(@Param('userId') userId: string) {
    this.shoppingCartService.clearCart(userId);
  }
   // Proteger la ruta con JWT
   @UseGuards(JwtAuthGuard)
   @Get(':userId')
   getCart(@Param('userId') userId: string) {
     return this.shoppingCartService.getCart(userId);
   }
 
   // Agregar producto al carrito
   @UseGuards(JwtAuthGuard)
   @Post(':userId')
   addItem(
     @Param('userId') userId: string,
     @Body('productId') productId: string,
     @Body('quantity') quantity: number,
   ) {
     return this.shoppingCartService.addItem(userId, productId, quantity);
   }
}
