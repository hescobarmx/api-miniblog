const express = require('express');
const apiRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorhandler');
const app = express();



app.use(express.json());
app.use(apiRouter);

//Middleware para el manejo de errores
app.use(errorHandler);

module.exports = app; 