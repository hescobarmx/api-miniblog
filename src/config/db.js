const { Pool } = require('pg');
const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

let pool; //El valor de let dependera del entorno

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
} else {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
}

module.exports = pool;