const express = require('express');

const app = express();

const apiRouter = require('./routes/index');

module.exports = app; 

app.use(express.json());
app.use(apiRouter);