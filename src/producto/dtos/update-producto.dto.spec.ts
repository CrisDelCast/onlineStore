// src/producto/dto/update-producto.dto.spec.ts
import { validate } from 'class-validator';
import { UpdateProductoDto } from './update-producto.dto';

describe('UpdateProductoDto', () => {
  
  it('should validate with optional fields', async () => {
    const dto = new UpdateProductoDto();
    dto.name = 'Updated Product'; // Campo opcional
    dto.price = 200; // Campo opcional
    dto.stock = 30; // Campo opcional

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });

  it('should fail validation if name is empty', async () => {
    const dto = new UpdateProductoDto();
    dto.name = ''; // Nombre vacío
    dto.price = 150;
    dto.stock = 20;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores
    expect(errors[0].property).toBe('name');
  });

  it('should allow valid name to pass validation', async () => {
    const dto = new UpdateProductoDto();
    dto.name = 'Valid Product'; // Nombre válido
    dto.price = 150;
    dto.stock = 20;

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });

  it('should allow omitted optional fields', async () => {
    const dto = new UpdateProductoDto();
    dto.name = 'Test Product';
    dto.price = 250; // Solo se establece el precio, los demás campos se omiten

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });

  it('should validate optional fields when provided', async () => {
    const dto = new UpdateProductoDto();
    dto.name = 'Updated Product';
    dto.price = 300;
    dto.stock = 10;
    dto.description = 'Updated product description'; // Descripción opcional
    dto.rating = 4.0; // Calificación opcional
    dto.ratingCount = 5; // Conteo de calificaciones opcional

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores
  });

  it('should fail validation if price is not a number', async () => {
    const dto = new UpdateProductoDto();
    dto.name = 'Updated Product';
    dto.price = NaN; // Precio no es un número
    dto.stock = 20;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores
    expect(errors[0].property).toBe('price');
  });

  it('should fail validation if stock is not a number', async () => {
    const dto = new UpdateProductoDto();
    dto.name = 'Updated Product';
    dto.price = 100;
    dto.stock = NaN; // Stock no es un número

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores
    expect(errors[0].property).toBe('stock');
  });
});
