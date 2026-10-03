const authorsService = require('../services/authors.service');

const getAuthors = async (req, res) => {
    try {
        const authors = await authorsService.getAuthors();

        res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const getAuthorById = async (req, res) => {
    try {
        const author = await authorsService.getAuthorById(req.params.id);

        if (!author) {
            return res.status(404).json({
                error: 'Author not found'
            });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const createAuthor = async (req, res) => {
    try {
        const { name, email, bio } = req.body;

        const author = await authorsService.createAuthor(name, email, bio);

        res.status(201).json(author);
    } catch (error) {
        console.error(error);

        if (error.code === '23505') {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const updateAuthor = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error);

        if (error.code === '23505') {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }
        
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const author = await authorsService.deleteAuthor(req.params.id);

        if (!author) {
            return res.status(404).json({
                error: 'Author not found'
            });
        }

        res.status(200).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};

const authorsController = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};

module.exports = authorsController;