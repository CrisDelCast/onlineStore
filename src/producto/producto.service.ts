import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { producto } from 'src/common/schemas/producto.schema';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { UpdateProductoDto } from './dtos/update-producto.dto';
import { UUID } from 'crypto';
@Injectable()
export class ProductoService {
    constructor(@InjectModel(producto.name) private productoModel: Model<producto>){}

    async create (producto: CrearProductoDto){
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
