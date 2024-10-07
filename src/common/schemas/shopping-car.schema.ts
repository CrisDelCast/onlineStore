// src/shopping-cart/schemas/shopping-cart.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './users.schema';
import { Producto } from './producto.schema';

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema()
export class ShoppingCart {
  @Prop({ type: Types.ObjectId, ref: 'userId', required: true })
  user: User;

  @Prop([{
    product: { type: Types.ObjectId, ref: 'productId', required: true },
    quantity: { type: Number, required: true, min: 1 }
  }])
  items: { product: Types.ObjectId, quantity: number }[];  // Cambiamos 'Product' por 'Types.ObjectId'

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
