export class CrearPedidoItemDto {
    producto: string; // ID del producto
    cantidad: number;
    precio: number;
  }
  
  export class CrearPedidoDto {
    items: CrearPedidoItemDto[];
  }
  