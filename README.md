# api_mini_blog 

Se trata de una api sencilla cuyo proposito es ayudar a estudiantes de desarrollo web a identificar los principales elementos de una api REST.

La api realizar las operaciones CRUD basicas sobre dos entidades authors y posts, 
estas con una relacion 1:N

## Índice

- [Tecnologías y estructura del proyecto](#tecnologías-y-estructura-del-proyecto)
- [Endpoints](#endpoints)
- [Cómo usar la API](#cómo-usar-la-api)
  - [Requisitos previos](#requisitos-previos)
  - [1. Clonar el repositorio](#1-clonar-el-repositorio)
  - [2. Crear la base de datos](#2-crear-la-base-de-datos)
  - [3. Crear las tablas](#3-crear-las-tablas)
  - [4. Insertar los datos iniciales](#4-insertar-los-datos-iniciales)
  - [5. Configurar las variables de entorno](#5-configurar-las-variables-de-entorno)
  - [6. Instalar las dependencias](#6-instalar-las-dependencias)
  - [7. Iniciar el servidor](#7-iniciar-el-servidor)
- [Ejecutar los tests](#ejecutar-los-tests)
- [Documentación OpenAPI (Swagger UI)](#documentación-openapi-swagger-ui)
- [Deployment en Railway](#deployment-en-railway)

# Tecnologías y estructura del proyecto

| Capa | Tecnología |
| --- | --- |
| Runtime | Node.js |
| Framework web | Express 5 |
| Base de datos | PostgreSQL (conexión con la librería `pg`) |
| Documentación | OpenAPI 3.0.3 + `swagger-ui-express` |
| Tests | Vitest + Supertest |

```text
api-miniblog/
├── index.js              # Punto de entrada: verifica la BD y levanta el servidor
├── openapi.yaml          # Especificación OpenAPI
├── .envexample           # Plantilla de variables de entorno
├── db/
│   ├── setup.sql         # Crea las tablas authors y posts
│   └── seed.sql          # Datos iniciales
└── src/
    ├── server.js         # App Express (middlewares, rutas, /api-docs)
    ├── config/db.js      # Pool de conexión a PostgreSQL
    ├── routes/           # Definición de rutas
    ├── controllers/      # Manejo de request/response
    ├── services/         # Consultas a la base de datos
    ├── validations/      # Validación de datos de entrada
    ├── middlewares/      # asyncHandler, notFoundHandler, errorHandler
    └── test/             # Tests de integración (Vitest + Supertest)
```

# Endpoints

Todas las respuestas, incluidos los errores, son JSON. Los errores tienen la forma `{ "error": "mensaje" }`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/authors` | Listar autores |
| GET | `/authors/:id` | Obtener un autor |
| POST | `/authors` | Crear un autor (`name` y `email` obligatorios) |
| PUT | `/authors/:id` | Actualizar un autor |
| DELETE | `/authors/:id` | Eliminar un autor (sus posts se eliminan en cascada) |
| GET | `/posts` | Listar posts |
| GET | `/posts/:id` | Obtener un post |
| GET | `/posts/author/:authorId` | Listar los posts de un autor |
| POST | `/posts` | Crear un post (`title`, `content` y `author_id` obligatorios) |
| PUT | `/posts/:id` | Actualizar un post |
| DELETE | `/posts/:id` | Eliminar un post |

El detalle de cada endpoint (parámetros, cuerpos y respuestas) está en la [documentación OpenAPI](#documentación-openapi-swagger-ui).




# Cómo usar la API

## Requisitos previos

- **Node.js 20.12 o superior** (el proyecto usa `process.loadEnvFile`; se recomienda la versión LTS actual) y **npm**.
- **PostgreSQL** instalado y en ejecución, con el cliente `psql` disponible en la terminal.
- **Git**.

## 1. Clonar el repositorio

Clona el repositorio y accede a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd api-miniblog
```

## 2. Crear la base de datos

> **Importante:** durante la creación del usuario, sustituye `'tu_contraseña'` por una contraseña propia.
>
> Si deseas utilizar otro nombre de usuario, asegúrate de reemplazarlo también en los comandos y archivos de configuración correspondientes.

### 2.1. Conectarse a PostgreSQL

Utiliza un usuario con permisos suficientes para crear usuarios y bases de datos:

```bash
psql -d postgres
```

### 2.2. Crear el usuario de la aplicación

```sql
CREATE USER miniblog_user WITH PASSWORD 'tu_contraseña';
```

### 2.3. Crear la base de datos

```sql
CREATE DATABASE miniblog_db OWNER miniblog_user;
```

### 2.4. Salir de PostgreSQL

```sql
\q
```cl

## 3. Crear las tablas

Desde la raíz del proyecto, ejecuta:

```bash
psql -U miniblog_user -d miniblog_db -f db/setup.sql
```

## 4. Insertar los datos iniciales

Ejecuta:

```bash
psql -U miniblog_user -d miniblog_db -f db/seed.sql
```

## 5. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
DB_USER=miniblog_user
DB_PASSWORD=tu_contraseña
```

> El archivo `.env` contiene información sensible y no debe subirse al repositorio.

> Opcional: puedes agregar `PORT=3000` para cambiar el puerto del servidor (por defecto es `3000`). En el repositorio hay una plantilla en `.envexample` que puedes copiar con `cp .envexample .env`.

## 6. Instalar las dependencias

```bash
npm install
```

## 7. Iniciar el servidor

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```


# Ejecutar los tests

Los tests son de **integración**: usan Supertest para llamar a la app de Express y consultan la base de datos real configurada en tu `.env`. Hay 13 tests (6 de `authors` y 7 de `posts`) en `src/test/`.

**Antes de correrlos** asegúrate de haber ejecutado `db/setup.sql` y `db/seed.sql` (los tests esperan que existan el autor con `id = 1` y el post con `id = 1`).

```bash
# Modo interactivo (watch): se vuelve a ejecutar al guardar cambios
npm test

# Una sola ejecución (útil para CI o para revisar el resultado final)
npx vitest run
```

> Los tests crean, actualizan y eliminan registros en la base de datos. Si no quieres tocar tus datos de desarrollo, crea una base de datos aparte (por ejemplo `miniblog_test`), ejecuta `setup.sql` y `seed.sql` sobre ella y apunta tu `.env` a esa base mientras corres los tests.

# Documentación OpenAPI (Swagger UI)

La especificación está en [`openapi.yaml`](./openapi.yaml) y se sirve con Swagger UI. Al iniciar el servidor (`npm run dev`) abre:

```text
http://localhost:3000/api-docs
```

Desde ahí puedes ver todos los endpoints, sus esquemas y probarlos con **Try it out**.

En producción la documentación está disponible en la misma ruta `/api-docs` de la URL pública del despliegue, por ejemplo:

```text
https://api-miniblog-production-ac77.up.railway.app/api-docs
```

> Si cambias el dominio público, actualiza la sección `servers` de `openapi.yaml` (incluye el prefijo `https://`) para que **Try it out** apunte al servidor correcto.

# Deployment en Railway

Guía breve para desplegar la API y su base de datos PostgreSQL en [Railway](https://railway.app).

## 1. Crear el proyecto y la base de datos

1. En Railway crea un **New Project** → **Deploy from GitHub repo** y selecciona este repositorio. Railway detecta Node.js y ejecuta `npm install` y `npm start` (`node index.js`).
2. En el mismo proyecto agrega un servicio de base de datos: **+ New** → **Database** → **Add PostgreSQL**.

## 2. Variables de entorno del servicio de la API

En el servicio de la API, pestaña **Variables**, define:

| Variable | Valor | Para qué sirve |
| --- | --- | --- |
| `NODE_ENV` | `production` | Hace que la app use `DATABASE_URL` en lugar de las variables `DB_*` y no busque el archivo `.env`. |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Cadena de conexión a PostgreSQL. Usa la referencia al servicio de base de datos (cambia `Postgres` si tu servicio tiene otro nombre). |
| `PORT` | _(no la definas)_ | Railway la inyecta automáticamente y la app ya la lee. |

> Cada variable es un par **nombre / valor**: no pegues fragmentos de código en la pestaña Variables, porque Railway interpreta cada línea como una variable y el build puede fallar. Las variables `DB_*` del `.env` local **no** se usan en producción.

## 3. URL interna y URL pública

| Tipo | Ejemplo | Quién puede usarla |
| --- | --- | --- |
| **Interna (private networking)** | `postgres.railway.internal:5432` | Solo los servicios del mismo proyecto y entorno en Railway. Es el host que trae `DATABASE_URL`, por eso la API se conecta a la base de datos sin salir a internet. |
| **Pública de la API** | `https://api-miniblog-production-ac77.up.railway.app` | Cualquiera. Se genera en el servicio de la API → **Settings** → **Networking** → **Generate Domain**. |
| **Pública de la base de datos** | variable `DATABASE_PUBLIC_URL` del servicio PostgreSQL | Tu máquina local, para ejecutar los scripts SQL. Úsala solo desde fuera de Railway. |

## 4. Crear las tablas y los datos en la base de Railway

Desde la raíz del proyecto, con `psql` instalado y usando `DATABASE_PUBLIC_URL` (cópiala desde las variables del servicio PostgreSQL):

```bash
psql "<DATABASE_PUBLIC_URL>" -f db/setup.sql
psql "<DATABASE_PUBLIC_URL>" -f db/seed.sql
```

> `setup.sql` hace `DROP TABLE` de `posts` y `authors` antes de crearlas: úsalo solo para inicializar la base, no sobre datos que quieras conservar.

## 5. Verificar el despliegue

Con el servicio en estado **Active**, prueba:

```text
https://api-miniblog-production-ac77.up.railway.app/authors
https://api-miniblog-production-ac77.up.railway.app/api-docs
```

Si algo falla, revisa los **Deploy Logs** del servicio: el mensaje `Base de datos conectada` indica que `DATABASE_URL` es correcta; `Error al conectar con postgres` indica un problema con esa variable o con `NODE_ENV`.


# Uso de AI

## 1. Revisión de controladores y creación de middleware global

### Prompt original

> Revisa el siguiente codigo, crea un middleware global para el manejo de errores considerando el codigo y los casos entregados.

Se proporcionaron los controladores de `authors` y `posts`, que inicialmente manejaban los errores individualmente mediante bloques `try/catch`.

### Respuesta

Se propuso centralizar el manejo de errores que estaba repetido en los controladores mediante un middleware global.

El middleware debía encargarse de:

- Registrar los errores.
- Manejar el error de PostgreSQL `23505`, correspondiente al email duplicado.
- Responder con `400` cuando el email ya existe.
- Responder con `500` para errores internos.

También se señaló que los errores `404` de recursos inexistentes debían permanecer en los controladores, porque no representan una excepción del servidor.

Se propuso inicialmente el siguiente middleware:

```js
const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Email duplicado
    if (err.code === '23505') {
        return res.status(400).json({
            error: 'Email already exists'
        });
    }

    // Error interno
    res.status(500).json({
        error: 'Internal server error'
    });
};

module.exports = errorHandler;