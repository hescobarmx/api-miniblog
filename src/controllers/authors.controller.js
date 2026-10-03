
const authorsService = require('../services/authors.service')

const getAuthors = async (req, res) => {
    const authors = await authorsService.getAuthors();
    res.json(authors);
};

const getAuthorById = async (req, res) => {
    const author = await authorsService.getAuthorById(req.params.id);
    res.json(author);
};
const createAuthor = async (req, res) => {
    const {name, email, bio} = req.body;
    const createAuthorConfirm = await authorsService.createAuthor(name, email, bio);
    res.json(createAuthorConfirm);
};

const updateAuthor = async (req, res) => {
    const {name, email, bio} = req.body;
    const updateAuthorConfirm = await authorsService.updateAuthor(req.params.id, name, email, bio);
    res.json(updateAuthorConfirm);
};
const deleteAuthor = async (req, res) => {
    const deleteAuthorConfirm = await authorsService.deleteAuthor(req.params.id);
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



