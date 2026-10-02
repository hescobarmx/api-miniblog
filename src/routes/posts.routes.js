const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts.controller');

router.get('/',postsController.getPosts);
router.get('/:id', postsController.getPostById);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;