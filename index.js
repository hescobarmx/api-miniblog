

const app = require('./src/server');
const pool = require('./src/config/db');
const PORT = process.env.PORT || 3000

async function startServer(){
    try{
        await pool.query("SELECT 1");
        console.log("Base de datos conectada")

        app.listen(PORT, ()=>{
        console.log(`Escuchando en http://localhost:${PORT}`);
        });        
      }
      catch(error)
      {
        console.log("Error al conectar con postgres", error);
      }
}

startServer();