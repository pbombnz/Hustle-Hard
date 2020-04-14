import * as express from 'express'
import * as ordersByListing from '../services/ordersByListing'

const router = express.Router()

/**
 * Only the producer and/or listing owner can perform this
 * call.
 */
router.get('/:listingId', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        listingId: req.params.listingId
    }

    try {
        const result = await ordersByListing.getOrdersByListingId(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

export default router
