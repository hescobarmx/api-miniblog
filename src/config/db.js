
const fs = require('fs');
const { loadEnvFile } = require('node:process');

if (fs.existsSync('.env')) {
    loadEnvFile();
}

const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

module.exports = pool;