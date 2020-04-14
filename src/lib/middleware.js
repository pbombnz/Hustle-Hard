const ServerError = require('../lib/error')

const isAuthenticated = async (req, res, next) => {
    if (req.user) {
        return next()
    }
    return next(new ServerError({
        status: 401,
        error: 'User is not authenticated'
    }))
}

const isNotAuthenticated = async (req, res, next) => {
    if (!req.user) {
        return next()
    }
    return next(new ServerError({
        status: 401,
        error: 'User is already authenticated'
    }))
}

module.exports = {
    auth: {
        isAuthenticated,
        isNotAuthenticated
    }
}
