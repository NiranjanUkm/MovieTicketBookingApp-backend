const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        console.error(`Error: ${error.message}`); // Log error for debugging
        res.status(error.status || 500).send({
            message: error.message || 'Internal Server Error',
            status: error.status || 500,
        });
    }
};

module.exports = asyncHandler;
