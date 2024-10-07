import { Controller, Post,Body,ValidationPipe, UseGuards, Get, Param} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Producto } from 'src/common/schemas/producto.schema';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService){

    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body(new ValidationPipe()) crearproducto: CrearProductoDto){
        return this.productoService.create(crearproducto);

    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Producto> {
        return this.productoService.findOne(id);
    }


}
