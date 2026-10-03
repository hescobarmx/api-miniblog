const express = require('express');

const router = express.Router();
const authorsController = require('../controllers/authors.controller')
const validateAuthor = require('../validations/authors.validation')

router.get('/', authorsController.getAuthors );
router.get('/:id', authorsController.getAuthorById);
router.post('/', validateAuthor ,authorsController.createAuthor);
router.put('/:id', validateAuthor, authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;