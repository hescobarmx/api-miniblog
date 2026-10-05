const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Error de email duplicado en PostgreSQL
    if (err.code === '23505') {
        return res.status(400).json({
            error: 'Email already exists'
        });
    }

    // Error interno del servidor
    res.status(500).json({
        error: 'Internal server error'
    });
};

module.exports = errorHandler;