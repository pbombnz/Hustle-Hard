import * as express from 'express'
import * as orders from '../services/orders'

const router = express.Router()

/**
 * Retrieves all orders of the authenticated user.
 */
router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
    }

    try {
        const result = await orders.getOrders(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * The operation is generally not performed by a user
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        body: req.body
    }

    try {
        const result = await orders.createOrder(options)
        res.status(200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Retrieves an order relating a the order ID suppied in the
 * path.
 */
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        id: req.params.id
    }

    try {
        const result = await orders.getOrderById(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Update an order by the Order ID supplied.
 */
router.put('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        body: req.body,
        id: req.params.id
    }

    try {
        const result = await orders.updateOrder(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

export default router
