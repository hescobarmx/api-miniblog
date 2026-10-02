
const { post } = require('../routes/authors.routes');
const postsService = require('../services/posts.service');


const getPosts = async (req, res) => {
   const posts =  await postsService.getPosts();
   res.json(posts);
};

const getPostById = async (req, res) => {
    const postsById = await postsService.getPostById();
    res.json(postsById);
};

const getPostsByAuthor = async (req, res) => {
    const postsByAuthor = await postsService.getPostsByAuthor();
    res.json(postsByAuthor);
};

const createPost = async (req, res) => {
    const createPostConfirm = await postsService.createPost();
    res.json(createPostConfirm);
};

const updatePost = async (req, res) => {
    const updatePostConfirm = await postsService.updatePost();
    res.json(updatePostConfirm);
    
};

const deletePost = async (req, res) => {
    const deletePostConfirm = await postsService.deletePost();
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
