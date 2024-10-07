import { Injectable } from '@nestjs/common';
// Importa el modelo si es MongoDB o el repositorio si es SQL
import { InjectModel } from '@nestjs/mongoose';  // O @InjectRepository para SQL
import { Model } from 'mongoose';  // O Repository si es SQL
import { Category,CategoryDocument } from 'src/common/schemas/categorias.schema';// O la entidad si es SQL

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
  ) {}

  async createCategory(name: string, description: string): Promise<Category> {
    const newCategory = new this.categoryModel({ name, description });
    return newCategory.save();
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async updateCategory(id: string, name: string, description: string): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, { name, description }, { new: true }).exec();
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
