import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasController } from './categorias.controller'; 
import { CategoriasService } from './categorias.service'; 
import { Category,CategorySchema  } from 'src/common/schemas/categorias.schema'; 

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService]
})
export class CategoriasModule {}
