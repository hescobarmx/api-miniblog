 const validatePost = (req, res, next) => {
    const { title, content, author_id } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'Title is required'
        });
    }

    if (!content || content.trim() === '') {
        return res.status(400).json({
            error: 'Content is required'
        });
    }

    if (!author_id) {
        return res.status(400).json({
            error: 'Author ID is required'
        });
    }

    next();
};

module.exports = validatePost;