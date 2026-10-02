const getAuthors = (req, res) => {
    res.json({ message: 'getAuthors funciona' });
};
const getAuthorById = (req, res) => {};
const createAuthor = (req, res) => {};
const updateAuthor = (req, res) => {};
const deleteAuthor = (req, res) => {};

const authorsController = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authorsController;

