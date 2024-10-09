import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Param, NotFoundException } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dtos/crear-produto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Producto } from '../common/schemas/producto.schema';

@Controller('producto')
export class ProductoController {
    constructor(private productoService: ProductoService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body(new ValidationPipe()) crearproducto: CrearProductoDto) {
        return this.productoService.create(crearproducto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Producto> {
        const producto = await this.productoService.findOne(id);
        if (!producto) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    }
}
