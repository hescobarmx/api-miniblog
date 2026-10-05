const authorsService = require('../services/authors.service');
const asyncHandler = require('../middlewares/asyncHandler');

const getAuthors = asyncHandler(async (req, res) => {
    const authors = await authorsService.getAuthors();

    res.status(200).json(authors);
});

const getAuthorById = asyncHandler(async (req, res) => {
    const author = await authorsService.getAuthorById(req.params.id);

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    res.status(200).json(author);
});

const createAuthor = asyncHandler(async (req, res) => {
    const { name, email, bio } = req.body;

    const author = await authorsService.createAuthor(
        name,
        email,
        bio
    );

    res.status(201).json(author);
});

const updateAuthor = asyncHandler(async (req, res) => {
    const { name, email, bio } = req.body;

    const author = await authorsService.updateAuthor(
        req.params.id,
        name,
        email,
        bio
    );

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    res.status(200).json(author);
});

const deleteAuthor = asyncHandler(async (req, res) => {
    const author = await authorsService.deleteAuthor(req.params.id);

    if (!author) {
        return res.status(404).json({
            error: 'Author not found'
        });
    }

    res.status(200).json(author);
});

const authorsController = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};

module.exports = authorsController;