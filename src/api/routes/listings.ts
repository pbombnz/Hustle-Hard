// eslint-disable-next-line @typescript-eslint/no-unused-vars
import passport from 'passport'
import * as express from 'express'
import * as listings from '../services/listings'

import middleware from '../../lib/middleware'

const router = express.Router()

/**
 * Create a new listing
 */
router.post('/', middleware.auth.isAuthenticated, async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    // @ts-ignore
    req.body.createdBy = req.user.id
    try {
        const result = await listings.createListing(req.body)
        res.status(200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Retrieve a list of listings
 */
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    // const options = {
    //     sort: req.query.sort
    // }

    try {
        const result = await listings.getListings()
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Retrieve the listing that matches the specfiied ID.
 */
router.get('/:id',
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const result = await listings.getListing(parseInt(req.params.id))
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
 * Update a listing
 */
router.put('/:id',
    middleware.auth.isAuthenticated,
    async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            const result = await listings.updateListing(parseInt(req.params.id), req.body)
            res.status(200).send(result.data)
        } catch (err) {
            res.status(500).send({
                status: 500,
                error: 'Server Error'
            })
        }
    }
)

export default router
