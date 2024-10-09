// src/categorias/categorias.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias.module';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from '../common/schemas/categorias.schema';

describe('CategoriasModule', () => {
  let categoriasModule: TestingModule;

  beforeEach(async () => {
    categoriasModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
        CategoriasModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(categoriasModule).toBeDefined();
  });

  it('should provide CategoriasService', () => {
    const categoriasService = categoriasModule.get<CategoriasService>(CategoriasService);
    expect(categoriasService).toBeDefined();
  });

  it('should provide CategoriasController', () => {
    const categoriasController = categoriasModule.get<CategoriasController>(CategoriasController);
    expect(categoriasController).toBeDefined();
  });

  it('should provide the Category model', () => {
    const categoryModel = categoriasModule.get(getModelToken(Category.name));
    expect(categoryModel).toBeDefined();
  });
});
