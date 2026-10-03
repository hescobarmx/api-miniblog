const express = require('express');
const apiRouter = require('./routes/index');
const app = express();


module.exports = app; 
app.use(express.json());
app.use(apiRouter);