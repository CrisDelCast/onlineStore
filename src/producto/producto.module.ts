import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto,ProductoSchema } from 'src/common/schemas/producto.schema';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
@Module({
    imports:[
        MongooseModule.forFeature([{
            name:Producto.name,
            schema:ProductoSchema,
            },
        ]),
    ],
    providers: [ProductoService],
    controllers: [ProductoController],
    exports: [ProductoService]
})
export class ProductoModule {}
