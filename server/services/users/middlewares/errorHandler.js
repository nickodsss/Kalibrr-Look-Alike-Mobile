const errorHandler = async (err, request, response, next) => {
    if (err.name === 'BSONError') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else {
        response.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { errorHandler }