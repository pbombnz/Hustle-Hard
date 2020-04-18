/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express'
import passport from 'passport'
import middleware from '../../lib/middleware'

import ServerError from '../../lib/error'

const router = express.Router()

/**
 * Authenticates a user via traditional credentials.
 */
router.post('/login/email',
    middleware.auth.isNotAuthenticated,
    passport.authenticate('local', { failWithError: true }),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return res.status(200).json({ success: true })
    },
    async (_err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new ServerError({
            status: 401,
            error: 'Authentication failed.'
        }))
    }
)

/**
 * PKI is not implemented yet.
 */
router.post('/login/pki',
    middleware.auth.isNotAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        return res.status(501).send()
    }
)

/**
 * Logs out an authenticated user.
 */
router.post('/logout',
    middleware.auth.isAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        req.logout()
        return res.status(200).json({
            status: 200,
            success: true
        })
    }
)

export default router
