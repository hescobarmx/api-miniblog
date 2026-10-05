const postsService = require('../services/posts.service');
const asyncHandler = require('../middlewares/asyncHandler');

const getPosts = asyncHandler(async (req, res) => {
    const posts = await postsService.getPosts();

    res.status(200).json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
    const post = await postsService.getPostById(req.params.id);

    if (!post) {
        return res.status(404).json({
            error: 'Post not found'
        });
    }

    res.status(200).json(post);
});

const getPostsByAuthor = asyncHandler(async (req, res) => {
    const posts = await postsService.getPostsByAuthor(req.params.authorId);

    if (posts.length == 0) {
        return res.status(404).json({
            error: 'Posts were not found'
        });
    }

    res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
    const { author_id, title, content, published } = req.body;

    const post = await postsService.createPost(
        author_id,
        title,
        content,
        published
    );

    res.status(201).json(post);
});

const updatePost = asyncHandler(async (req, res) => {
    const { author_id, title, content, published } = req.body;

    const post = await postsService.updatePost(
        req.params.id,
        author_id,
        title,
        content,
        published
    );

    if (!post) {
    return res.status(404).json({
        error: 'Post not found'
    });
    }

   

    res.status(200).json(post);
});

const deletePost = asyncHandler(async (req, res) => {
    const post = await postsService.deletePost(req.params.id);

    if (!post) {
        return res.status(404).json({
            error: 'Post not found'
        });
    }

    res.status(200).json(post);
});

const postsController = {
    getPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
};

module.exports = postsController;