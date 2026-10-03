const express = require('express');

const router = express.Router();
const validatePost = require('../validations/posts.validation');

const postsController = require('../controllers/posts.controller');

router.get('/',postsController.getPosts);
router.get('/:id', postsController.getPostById);
router.get('/author/:authorId', postsController.getPostsByAuthor);
router.post('/', validatePost, postsController.createPost);
router.put('/:id', validatePost, postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;