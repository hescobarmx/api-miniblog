const express = require('express');

const authorsRouter = require('./authors.routes');
const postsRouter = require('./posts.routes');

const apiRouter = express.Router();

apiRouter.use('/authors', authorsRouter);
apiRouter.use('/posts', postsRouter);

module.exports = apiRouter;