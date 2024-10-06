import { Injectable } from '@nestjs/common';
import { Cart, CartItem  } from './entities/car.entity'; 
import { ProductoService } from 'src/producto/producto.service'; 

@Injectable()
export class ShoppingCarService {
  private carts: Map<string, Cart> = new Map();  // Mapa de carritos por usuario

  constructor(private productsService: ProductoService) {}

  // Obtener el carrito de un usuario
  getCart(userId: string): Cart {
    return this.carts.get(userId) || new Cart(userId);
  }

  // Agregar un producto al carrito
  async addItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    let cart = this.getCart(userId);
    const product = await this.productsService.findOne(productId);

    // Si el producto ya está en el carrito, aumenta la cantidad
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Recalcular el precio total
    cart.totalPrice += product.price * quantity;
    this.carts.set(userId, cart);
    return cart;
  }

  // Eliminar un producto del carrito
  async removeItem(userId: string, productId: string): Promise<Cart> {
    let cart = this.getCart(userId);
    cart.items = cart.items.filter(item => item.productId !== productId);

    const product = await this.productsService.findOne(productId);
    cart.totalPrice -= product.price * (cart.items.find(item => item.productId === productId)?.quantity || 0);

    this.carts.set(userId, cart);
    return cart;
  }

  // Limpiar el carrito
  clearCart(userId: string): void {
    this.carts.delete(userId);
  }
}
