const express = require('express');

const router = express.Router();

router.get('/', () => {});
router.get('/:id', () => {});
router.get('/author/:authorId', () => {});
router.post('/', () => {});
router.put('/:id', () => {});
router.delete('/:id', () => {});

module.exports = router;