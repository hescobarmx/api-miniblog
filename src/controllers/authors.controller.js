
const authorsService = require('../services/authors.service')

const getAuthors = async (req, res) => {
    const authors = await authorsService.getAuthors();
    res.json(authors);
};

const getAuthorById = async (req, res) => {
    const author = await authorsService.getAuthorById();
    res.json(author);
};
const createAuthor = async (req, res) => {
    const createAuthorConfirm = await authorsService.createAuthor();
    res.json(createAuthorConfirm);
};

const updateAuthor = async (req, res) => {
    const updateAuthorConfirm = await authorsService.updateAuthor();
    res.json(updateAuthorConfirm);
};
const deleteAuthor = async (req, res) => {
    const deleteAuthorConfirm = await authorsService.deleteAuthor();
    res.json(deleteAuthorConfirm);
};

const authorsController = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authorsController;



