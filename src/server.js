const express = require('express');
const apiRouter = require('./routes/index');
const notFoundHandler = require('./middlewares/notFoundHandler')
const errorHandler = require('./middlewares/errorhandler');


/*SWAGGER: DOCUMENTATION */
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(apiRouter);

/*Documentation */
const swaggerDocument = YAML.parse(
    fs.readFileSync('./openapi.yaml', 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//midleware para el manejo de rutas desconocidas 
app.use(notFoundHandler);

//Middleware para el manejo de errores
app.use(errorHandler);

module.exports = app; 