
const app = require('./src/server');
const { loadEnvFile } = require('node:process');

loadEnvFile();

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Escuchando en http://localhost:${PORT}`);
})
