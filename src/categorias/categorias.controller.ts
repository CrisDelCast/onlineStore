import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriasService } from './categorias.service'; 
import { Category } from 'src/common/schemas/categorias.schema'; // O la entidad si es SQL

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriesService: CategoriasService) {}

  @Post()
  async createCategory(@Body() body: { name: string; description: string }): Promise<Category> {
    return this.categoriesService.createCategory(body.name, body.description);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: { name: string; description: string }
  ): Promise<Category> {
    return this.categoriesService.updateCategory(id, body.name, body.description);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
