import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { producto,ProductoSchema } from 'src/common/schemas/producto.schema';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
@Module({
    imports:[
        MongooseModule.forFeature([{
            name:producto.name,
            schema:ProductoSchema,
            },
        ]),
    ],
    providers: [ProductoService],
    controllers: [ProductoController],
})
export class ProductoModule {}
