# SEED y Paginación - Pokedex

Esta sección se enfoca en la grabación a base de datos y más formas de hacer inserciones. Los temas que se ven son:

- Uso de modelos en diferentes módulos.
- `SEED` para llenar la base de datos.
- Paginación de resultados.
- DTOs para `Query Parameters`.
- Transformaciones de DTOs.

### Configuraciones para levantar nuestro proyecto

1. Clonar el repositorio. 
2. Ejecutar el comando: 
```
npm install
```
3. Tener `Nest CLI` instalando: 
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos: 
```
docker-compose up -d
```
5. Reconstruir la base de datos con la semilla `SEED` por petición de tipo `GET`:
```
http://localhost:3000/api/v2/seed
```

### Tecnologías usadas:
* MongoDB
* Nest