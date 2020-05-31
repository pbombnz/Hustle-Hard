/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express'
import * as users from '../services/users'
import * as Schemas from '../../definitions'

import middleware from '../../lib/middleware'

const router: express.Router = express.Router()

/**
 * Registers a new user.
 */
router.post('/',
    middleware.auth.isNotAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const result = await users.registerUser(req.body as Schemas.User)
            res.status(result.status || 200).send(result.data)
        } catch (err) {
            res.status(500).send({
                status: 500,
                error: 'Server Error'
            })
        }
    }
)

/**
 * Returns the authenicated user's own information.
 */
router.get('/',
    middleware.auth.isAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        res.status(200).json(req.user)
    }
)

/**
 * Update the authenicated user's own information.
 */
router.put('/',
    middleware.auth.isAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        // @ts-ignore
        const userId: number = req.user.id

        try {
            const result = await users.updateUser(userId, req.body)
            res.status(result.status || 200).send(result.data)
        } catch (err) {
            res.status(500).send({
                status: 500,
                error: 'Server Error'
            })
        }
    }
)

/**
 * A user may watch a listing to get reminders when the listing
 * is expiring and/or if they have been outbidded. This action
 * is similar to user bookmarking a webpage in a browser.
 */
router.get('/watchlists',
    middleware.auth.isAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            // @ts-ignore
            const result = await users.getUserListingWatchlist(req.user.id)
            res.status(result.status || 200).send(result.data)
        } catch (err) {
            next(err)
        }
    }
)

export default router
