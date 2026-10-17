
function notFound(req, res, next) {
    res.status(404).json({
        message: "Route not found"
    });
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: "Something went wrong"
    });
}

module.exports = {
    notFound,
    errorHandler
};
