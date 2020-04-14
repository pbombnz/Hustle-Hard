/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express'
import * as users from '../services/users'

import middleware from '../../lib/middleware'

const router: express.Router = express.Router()

/**
 * Registers a new user.
 */
router.post('/', middleware.auth.isNotAuthenticated, async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        body: req.body
    }

    try {
        const result = await users.registerUser(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Returns the authenicated user's own information.
 */
router.get('/', middleware.auth.isAuthenticated, async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    res.status(200).json(req.user)
})

/**
 * Returns the authenicated user's own information.
 */
router.put('/', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        body: req.body
    }

    try {
        const result = await users.updateUser(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * A user may watch a listing to get reminders when the listing
 * is expiring and/or if they have been outbidded. This action
 * is similar to user bookmarking a webpage in a browser.
 */
router.get('/watchlists', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
    }

    try {
        const result = await users.getUserListingWatchlist(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        next(err)
    }
})

export default router
