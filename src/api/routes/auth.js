const express = require('express')
const passport = require('passport')
const middleware = require('../../lib/middleware')

const ServerError = require('../../lib/error')

const router = new express.Router()

/**
 * Authenticates a user via traditional credentials.
 */
router.post('/login/email',
    middleware.auth.isNotAuthenticated,
    passport.authenticate('local', { failWithError: true }),
    async (req, res, next) => {
        return res.status(200).json({ success: true })
    },
    async (_err, req, res, next) => {
        next(new ServerError({
            status: 401,
            error: 'Authentication failed.'
        }))
    })

/**
 * PKI is not implemented yet.
 */
router.post('/login/pki', middleware.auth.isNotAuthenticated, async (req, res, next) => {
    return res.status(501).send()
})

/**
 * Logs out an authenticated user.
 */
router.post('/logout', middleware.auth.isAuthenticated, async (req, res, next) => {
    req.logout()
    return res.status(200).json({ success: true })
})

module.exports = router
