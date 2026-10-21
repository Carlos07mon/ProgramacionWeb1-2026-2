# Taller semana 8 - Aplícalo a TU API

## API seleccionada

Para este proyecto se utilizó Rick and Morty API.

Documentación:
https://rickandmortyapi.com/documentation/#rest

## Endpoint utilizado

GET https://rickandmortyapi.com/api/character

Este endpoint permite obtener información de los personajes
de la serie Rick and Morty.

## Parámetros utilizados

- page: permite consultar diferentes páginas.
- name: permite buscar personajes por nombre.
- status: permite filtrar personajes por estado.

Los estados disponibles son:

- alive
- dead
- unknown

## Datos utilizados

La API proporciona información como:

- id
- name
- status
- species
- type
- image
- origin
- location

## Conexión con la API

Se utilizó fetch() para realizar solicitudes HTTP.

La función obtenerPersonajes() permite consultar
los personajes y obtener los resultados en formato JSON.

## Estados implementados

### Cargando

Se muestra un mensaje mientras se obtienen los datos.

### Error

Si ocurre un problema de conexión, se muestra un
mensaje de error y un botón para reintentar.

### Sin resultados

Cuando una búsqueda no encuentra personajes,
se muestra un mensaje informativo.

## Paginación

Se implementó un botón llamado "Cargar más".

Este permite obtener nuevas páginas de personajes
sin eliminar los resultados anteriores.

## Favoritos

Se implementó un sistema de favoritos utilizando
localStorage.

El usuario puede:

- Agregar personajes a favoritos.
- Eliminar personajes de favoritos.
- Consultar sus personajes favoritos.
- Mantener sus favoritos al recargar la página.

## Archivos utilizados

- hola.html: estructura de la aplicación.
- js/app.js: lógica principal.
- js/api.js: conexión con la API.
- js/favoritos.js: almacenamiento de favoritos.
- css/tailwind.css: estilos de la aplicación.

## Pruebas realizadas

Se definieron las siguientes pruebas funcionales:

1. Cargar personajes desde la API.
2. Buscar personajes por nombre.
3. Filtrar personajes por estado.
4. Consultar más resultados.
5. Agregar personajes a favoritos.
6. Eliminar personajes de favoritos.
7. Verificar la persistencia con localStorage.
8. Comprobar el mensaje cuando no existen resultados.
9. Comprobar el manejo de errores de conexión.

## Conclusión

La aplicación Multiverso Explorer fue adaptada para
consumir información desde una API REST.

Se implementaron solicitudes asíncronas, manejo de
errores, paginación y almacenamiento local.

Esto permite que la aplicación trabaje con datos reales
y conserve las preferencias del usuario.