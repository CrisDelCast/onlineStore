import { Controller, Post,Body,ValidationPipe} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dtos/crear-produto.dto';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService){

    }
    @Post()
    async create(@Body(new ValidationPipe()) crearproducto: CrearProductoDto){
        return this.productoService.create(crearproducto);

    }


}
