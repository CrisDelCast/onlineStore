// src/producto/dto/crear-producto.dto.spec.ts
import { validate } from 'class-validator';
import { CrearProductoDto } from './crear-produto.dto';

describe('CrearProductoDto', () => {
  
  it('should validate with all required fields', async () => {
    const dto = new CrearProductoDto();
    dto.name = 'Test Product';
    dto.price = 100;
    dto.stock = 50;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });

  it('should fail validation if name is empty', async () => {
    const dto = new CrearProductoDto();
    dto.name = ''; // Nombre vacío
    dto.price = 100;
    dto.stock = 50;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores
    expect(errors[0].property).toBe('name');
  });

  it('should fail validation if price is not a number', async () => {
    const dto = new CrearProductoDto();
    dto.name = 'Test Product';
    dto.price = NaN; // Precio no es un número
    dto.stock = 50;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores
    expect(errors[0].property).toBe('price');
  });

  it('should allow optional fields to be omitted', async () => {
    const dto = new CrearProductoDto();
    dto.name = 'Test Product';
    dto.price = 100;
    dto.stock = 50;

    // No se establece description, rating o ratingCount

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });

  it('should validate optional fields when provided', async () => {
    const dto = new CrearProductoDto();
    dto.name = 'Test Product';
    dto.price = 100;
    dto.stock = 50;
    dto.description = 'A product description'; // Descripción opcional
    dto.rating = 4.5; // Calificación opcional
    dto.ratingCount = 10; // Conteo de calificaciones opcional

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });
});
