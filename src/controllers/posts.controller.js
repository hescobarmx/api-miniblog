
const postsService = require('../services/posts.service');

const getPosts = async (req, res) => {
   const posts =  await postsService.getPosts();
   res.json(posts);
};

const getPostById = async (req, res) => {
    const postsById = await postsService.getPostById(req.params.id);
    res.json(postsById);
};

const getPostsByAuthor = async (req, res) => {
    const postsByAuthor = await postsService.getPostsByAuthor(req.params.id);
    res.json(postsByAuthor);
};

const createPost = async (req, res) => {
    const createPostConfirm = await postsService.createPost();
    res.json(createPostConfirm);
};

const updatePost = async (req, res) => {
    const {author_id, title, content, published} = req.body;
    const updatePostConfirm = await postsService.updatePost(req.params.id, author_id, title, content, published);
    res.json(updatePostConfirm);
    
};

const deletePost = async (req, res) => {
    const deletePostConfirm = await postsService.deletePost(req.params.id);
    res.send(deletePostConfirm);
};


const postsController = {
    getPosts,
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
}

module.exports = postsController;
