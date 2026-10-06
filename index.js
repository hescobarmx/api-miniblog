

const app = require('./src/server');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000

async function startServer(){
    try{
        await pool.query("SELECT 1");
        console.log("Base de datos conectada")

        app.listen(PORT, ()=>{
        console.log(`Escuchando en http://localhost:${PORT}`);
        console.log("OpenAPI Documentation here -> http://localhost:3000/api-docs")
        });        
      }
      catch(error)
      {
        console.log("Error al conectar con postgres", error);
      }
}

startServer();