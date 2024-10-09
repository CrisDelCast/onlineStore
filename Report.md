# Informe Detallado de la API

## 1. Endpoints de la API

### Autenticación (AuthModule)

- **POST /auth/login**
  - **Descripción**: Inicio de sesión
  - **Parámetros**:
    - `email`: string (requerido)
    - `password`: string (requerido)
  - **Respuesta**:
    - **200 OK**: `{ "token": "JWT_TOKEN" }`
    - **401 Unauthorized**: `{ "message": "Invalid credentials" }`

- **POST /auth/register**
  - **Descripción**: Registro un nuevo usuario
  - **Parámetros**:
    - `username`: string (requerido)
    - `email`: string (requerido)
    - `password`: string (requerido)
  - **Respuesta**:
    - **201 Created**: `{ "message": "User registered successfully" }`
    - **400 Bad Request**: `{ "message": "User already exists" }`

### Productos (ProductoModule)

- **GET /productos**
  - **Descripción**: Devuelve todos los productos
  - **Respuesta**:
    - **200 OK**: `[ { "id": "1", "name": "Producto A", "price": 100, "stock": 50 }, ... ]`

- **GET /productos/:id**
  - **Descripción**: Devuelve un producto específico dado un ID
  - **Parámetros**:
    - `id`: string (requerido)
  - **Respuesta**:
    - **200 OK**: `{ "id": "1", "name": "Producto A", "price": 100, "stock": 50 }`
    - **404 Not Found**: `{ "message": "Product not found" }`

- **POST /productos**
  - **Descripción**: Creación de un nuevo producto
  - **Parámetros**:
    - `name`: string (requerido)
    - `price`: number (requerido)
    - `stock`: number (requerido)
    - `description`: string (opcional)
  - **Respuesta**:
    - **201 Created**: `{ "message": "Product created successfully" }`

- **PUT /productos/:id**
  - **Descripción**: Actualización de un producto existente
  - **Parámetros**:
    - `id`: string (requerido)
    - `name`: string (opcional)
    - `price`: number (opcional)
    - `stock`: number (opcional)
  - **Respuesta**:
    - **200 OK**: `{ "message": "Product updated successfully" }`
    - **404 Not Found**: `{ "message": "Product not found" }`

- **DELETE /productos/:id**
  - **Descripción**: Eliminar un producto por ID
  - **Parámetros**:
    - `id`: string (requerido)
  - **Respuesta**:
    - **200 OK**: `{ "message": "Product deleted successfully" }`
    - **404 Not Found**: `{ "message": "Product not found" }`

### Categorías (CategoriasModule)

- **GET /categorias**
  - **Descripción**: Obtenemos todas las categorías del sistema
  - **Respuesta**:
    - **200 OK**: `[ { "id": "1", "name": "Categoría A", "description": "Descripción de la categoría" }, ... ]`

- **POST /categorias**
  - **Descripción**: Crear una nueva categoría
  - **Parámetros**:
    - `name`: string (requerido)
    - `description`: string (requerido)
  - **Respuesta**:
    - **201 Created**: `{ "message": "Category created successfully" }`

- **PUT /categorias/:id**
  - **Descripción**: Actualizar una categoría existente
  - **Parámetros**:
    - `id`: string (requerido)
    - `name`: string (opcional)
    - `description`: string (opcional)
  - **Respuesta**:
    - **200 OK**: `{ "message": "Category updated successfully" }`
    - **404 Not Found**: `{ "message": "Category not found" }`

- **DELETE /categorias/:id**
  - **Descripción**: Eliminar una categoría
  - **Parámetros**:
    - `id`: string (requerido)
  - **Respuesta**:
    - **200 OK**: `{ "message": "Category deleted successfully" }`
    - **404 Not Found**: `{ "message": "Category not found" }`

### Carrito de Compras (ShoppingCartModule)

- **GET /carrito**
  - **Descripción**: Obtenemos el carrito del usuario actual
  - **Respuesta**:
    - **200 OK**: `{ "items": [ { "productId": "1", "quantity": 2 }, ... ] }`

- **POST /carrito**
  - **Descripción**: Añadimos un producto al carrito.
  - **Parámetros**:
    - `productId`: string (requerido)
    - `quantity`: number (requerido, mínimo: 1)
  - **Respuesta**:
    - **201 Created**: `{ "message": "Product added to cart" }`

- **DELETE /carrito/:id**
  - **Descripción**: Eliminamos un producto del carrito
  - **Parámetros**:
    - `id`: string (requerido)
  - **Respuesta**:
    - **200 OK**: `{ "message": "Product removed from cart" }`
    - **404 Not Found**: `{ "message": "Product not found in cart" }`

- **POST /carrito/checkout**
  - **Descripción**: Chekout de la compra
  - **Respuesta**:
    - **200 OK**: `{ "message": "Order processed successfully" }`

### Pedidos (OrdersModule)

- **GET /pedidos**
  - **Descripción**: Muestra todos los pedidos con su estado y fecha
  - **Respuesta**:
    - **200 OK**: `[ { "id": "1", "status": "shipped", "orderDate": "2024-10-01T00:00:00Z" }, ... ]`

- **POST /pedidos**
  - **Descripción**: Crear un nuevo pedido
  - **Parámetros**:
    - `items`: array de objetos (requerido)
      - `product`: string (ID del producto, requerido)
      - `quantity`: number (cantidad, requerido)
  - **Respuesta**:
    - **201 Created**: `{ "message": "Order created successfully" }`

- **DELETE /pedidos/:id**
  - **Descripción**: Eliminar un pedido por id
  - **Parámetros**:
    - `id`: string (requerido)
  - **Respuesta**:
    - **200 OK**: `{ "message": "Order deleted" }`
    - **404 Not Found**: `{ "message": "Order not found" }`

## 2. Autenticación y Autorización
### Mecanismo de Autenticación:

Se ha implementado un sistema de autenticación basado en JSON Web Tokens (JWT). Cuando un usuario se autentica correctamente, se genera un JWT que contiene información relevante sobre el usuario, como su identificador único. Este token se envía al cliente y debe ser incluido en el encabezado de cada solicitud a los recursos protegidos.

### Middleware de Interceptación:

Se ha desarrollado un middleware de autenticación encargado de interceptar todas las solicitudes a los endpoints protegidos. Este middleware verifica la presencia y validez del JWT incluido en el encabezado de la solicitud. En caso de que el token sea válido, se extrae la información del usuario y se adjunta al objeto de solicitud (request) para su posterior utilización en las rutas protegidas.

### Control de Acceso Basado en Roles:

Para implementar un control de acceso más granular, se ha incorporado un sistema de roles de usuario. Cada usuario puede pertenecer a algún rol ('admin', 'cliente'). Los roles se almacenan en la base de datos y se asocian a los usuarios. El middleware de autenticación verifica no solo la validez del token, sino también si el usuario que realiza la solicitud tiene los permisos necesarios para acceder al recurso solicitado.

## 3. Persistencia de Datos en MongoDB
### Modelo de Datos:

Se ha utilizado Mongoose como ORM (Object Relational Mapper) para interactuar con la base de datos MongoDB. Cada entidad del sistema (usuario, producto, categoría, carrito de compras, pedido) cuenta con un esquema definido en Mongoose:

- Usuario (User): Contiene campos como nombre de usuario, correo electrónico, contraseña encriptada y rol.
- Producto (Product): Incluye propiedades como identificador único, nombre, precio, descripción, stock, calificación y número de calificaciones.
- Categoría (Category): Almacena el nombre y descripción de las categorías de productos.
- Carrito de Compras (ShoppingCart): Establece una relación entre un usuario y los productos que ha añadido a su carrito.
- Pedido (Order): Representa un pedido realizado por un usuario, incluyendo referencias a los productos, fecha de realización y estado del pedido.

### Operaciones CRUD:

Para cada entidad, se han implementado las operaciones CRUD básicas. Estas operaciones permiten crear nuevos registros, consultar información existente, modificar datos y eliminar registros de la base de datos. Los servicios de cada módulo encapsulan estas operaciones, proporcionando una interfaz clara y concisa para interactuar con la base de datos.

- **Esquemas de Mongoose**:
  - **Usuario**: `User` (`username`, `email`, `password`, `role`).
  - **Producto**: `Producto` (`id`, `name`, `price`, `description`, `stock`, `rating`, `ratingCount`).
  - **Categoría**: `Category` (`name`, `description`, `createdAt`).
  - **Carrito de Compras**: `ShoppingCart` ( `User`, `Producto`). Referencias
  - **Pedido**: `Order` ( `User`, `Producto`, `orderDate`, `status`). Referencias y atributos

- **Operaciones CRUD**: Implementamos las operaciones CRUD en los servicios de cada módulo, permitiendo crear, leer, actualizar y eliminar datos de la base de datos.

## Archivo JSON de Postman


```json
{
  "info": {
    "_postman_id": "12345678-1234-5678-1234-567812345678",
    "name": "Tienda Online API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Autenticación",
      "item": [
        {
          "name": "Iniciar sesión",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\"email\":\"test@example.com\",\"password\":\"123456\"}"
            },
            "url": {
              "raw": "{{url}}/auth/login",
              "host": ["{{url}}"],
              "path": ["auth", "login"]
            }
          }
        }
        // ...
