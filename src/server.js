const express = require('express');
const apiRouter = require('./routes/index');
const notFoundHandler = require('./middlewares/notFoundHandler')
const errorHandler = require('./middlewares/errorhandler');
const app = express();



app.use(express.json());
app.use(apiRouter);

//midleware para el manejo de rutas desconocidas 
app.use(notFoundHandler);

//Middleware para el manejo de errores
app.use(errorHandler);

module.exports = app; 