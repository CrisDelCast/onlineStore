import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Producto } from './producto.schema';

@Schema()
export class PedidoItem extends Document {
  @Prop({ type: String, ref: 'Producto' })
  producto: Producto;

  @Prop({ type: Number, required: true })
  cantidad: number;

  @Prop({ type: Number, required: true })
  precio: number;
}

export const PedidoItemSchema = SchemaFactory.createForClass(PedidoItem);
