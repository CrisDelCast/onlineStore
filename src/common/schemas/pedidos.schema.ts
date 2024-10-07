// src/orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './users.schema';
import { Producto } from './producto.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop([{
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }])
  items: { product: Producto, quantity: number }[];

  @Prop({ default: Date.now })
  orderDate: Date;

  @Prop({ required: true })
  status: string;  // 'pending', 'paid', 'shipped', etc.
}

export const OrderSchema = SchemaFactory.createForClass(Order);
