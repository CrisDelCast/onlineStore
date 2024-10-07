// src/shopping-cart/shopping-cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ShoppingCart } from 'src/common/schemas/shopping-car.schema';


@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCart>
  ) {}

  async getCartByUser(userId: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOne({ user: userId }).populate('items.product').exec();
  }

  async addItemToCart(userId: string, productId: string, quantity: number): Promise<ShoppingCart> {
    const cart = await this.shoppingCartModel.findOne({ user: userId });
    const productObjectId = new Types.ObjectId(productId);  // Aseguramos que sea un ObjectId

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.equals(productObjectId));
      if (itemIndex > -1) {
        // Si el producto ya está en el carrito, actualizamos la cantidad
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Si no está en el carrito, lo agregamos
        cart.items.push({ product: productObjectId, quantity });
      }
      return cart.save();
    } else {
      // Si el usuario no tiene carrito, creamos uno
      const newCart = new this.shoppingCartModel({
        user: userId,
        items: [{ product: productObjectId, quantity }]
      });
      return newCart.save();
    }
  }

  async removeItemFromCart(userId: string, productId: string): Promise<ShoppingCart> {
    const cart = await this.shoppingCartModel.findOne({ user: userId });
    const productObjectId = new Types.ObjectId(productId);

    if (cart) {
      cart.items = cart.items.filter(item => !item.product.equals(productObjectId));
      return cart.save();
    }
    return null;
  }

  async clearCart(userId: string): Promise<void> {
    await this.shoppingCartModel.findOneAndDelete({ user: userId }).exec();
  }
}
