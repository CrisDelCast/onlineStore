import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID, UUID } from "crypto";

@Schema()
export class producto {

    @Prop({
        type: String,
        default: () => randomUUID(), // Genera un UUID para cada nuevo producto
        unique: true, // Asegura que cada ID es único
      })
    id: string;

    @Prop({ required: true }) // Nombre del producto 
    name: string;

    @Prop({ required: true }) // Precio del producto requerido
    price: number;

    @Prop() // Descripción opcional
    description?: string;

    @Prop({ required: true }) // Stock del producto requerido
    stock: number;

    @Prop({ default: 0, min: 0, max: 5 }) // Calificación de 0 a 5
    rating?: number;

    @Prop({ default: 0 }) // para almacenar la cantidad de calificaciones recibidas
    ratingCount?: number;

}
export const ProductoSchema = SchemaFactory.createForClass(producto);