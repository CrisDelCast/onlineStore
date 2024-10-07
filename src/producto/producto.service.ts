import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from 'src/common/schemas/producto.schema';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';

@Injectable()
export class ProductoService {
    constructor(@InjectModel(Producto.name) private productoModel: Model<Producto>){}

    async create(producto: CrearProductoDto) {
        // Busca un producto existente con el mismo nombre
        const existingProducto = await this.productoModel.findOne({ nombre: producto.name }).exec();
    
        if (existingProducto) {
            // Si el producto ya existe, se suma el stock
            existingProducto.stock += producto.stock; // Asumiendo que 'stock' es el campo que quieres sumar
            return existingProducto.save();
        }
    
        // Si no existe, crea un nuevo producto
        const createdProducto = new this.productoModel(producto);
        return createdProducto.save();
    }

    async update (id: string, producto: UpdateProductoDto){
        return this.productoModel.findByIdAndUpdate(id,producto,{
            new: true,
        }).exec();
    }
    async findAll() {
        return this.productoModel.find().exec();
    }
    async findOne(id: string){
        return this.productoModel.findById(id).exec();
    }
    async delete (id:string){
        return this.productoModel.findByIdAndDelete(id).exec();
    }

    


}
