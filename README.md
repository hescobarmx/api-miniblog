# api_mini_blog 

Se trata de una api sencilla cuyo proposito es ayudar a estudiantes de desarrollo web a identificar los principales elementos de una api REST.

La api realizar las operaciones CRUD basicamos sobre dos entidades authors y posts, 
estas con una relacion 1:N

///Aqui va el indice 




# Cómo usar la API

## 1. Clonar el repositorio

Clona el repositorio y accede a la carpeta del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd MiniBlog
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
```

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