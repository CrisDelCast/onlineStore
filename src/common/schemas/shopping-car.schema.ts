import { Schema } from 'mongoose';

export const CartSchema = new Schema({
  userId: { type: String, required: true },  // Si manejas usuarios
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  totalPrice: { type: Number, required: true, default: 0 },
});
