const postsService = require('../services/posts.service');

const getPosts = async (req, res) => {
    try {
        const posts = await postsService.getPosts();

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postsService.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostsByAuthor = async (req, res) => {
    try {
        const posts = await postsService.getPostsByAuthor(req.params.authorId);

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createPost = async (req, res) => {
    try {
        const { author_id, title, content, published } = req.body;

        const post = await postsService.createPost(
            author_id,
            title,
            content,
            published
        );

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { author_id, title, content, published } = req.body;

        const post = await postsService.updatePost(
            req.params.id,
            author_id,
            title,
            content,
            published
        );

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await postsService.deletePost(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const postsController = {
    getPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
};

module.exports = postsController;