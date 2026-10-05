
const pool  = require('../config/db');

const getPosts = async () => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
};
const getPostById = async (id) => {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1;", [id]);
    return result.rows[0];
};
const getPostsByAuthor = async (author_id) => {
    const result = await pool.query("SELECT posts.*, authors.name, authors.email, authors.bio FROM posts JOIN authors ON posts.author_id = authors.id WHERE posts.author_id = $1;", [author_id]);
    return result.rows;
};
const createPost = async (author_id, title, content, published) => {
    const result = pool.query("INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *;",[author_id, title, content, published] );
    return (await result).rows[0];
};

const updatePost = async (id, author_id, title, content, published) => {
    const result = await pool.query("UPDATE posts SET author_id = $1, title = $2, content = $3, published = $4 WHERE id = $5 RETURNING *;", [author_id, title, content, published, id]);
    return result.rows[0];
};

const deletePost = async (id) => {
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING * ;", [id]);
    return result.rows;
};

const postsService = {
    getPosts,  
    getPostById,
    getPostsByAuthor,
    createPost,
    updatePost,
    deletePost
}

module.exports = postsService;
