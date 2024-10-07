import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service'; 
import { Category } from 'src/common/schemas/categorias.schema'; // O la entidad si es SQL
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriesService: CategoriasService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() body: { name: string; description: string }): Promise<Category> {
    return this.categoriesService.createCategory(body.name, body.description);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: { name: string; description: string }
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, body.name, body.description);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
