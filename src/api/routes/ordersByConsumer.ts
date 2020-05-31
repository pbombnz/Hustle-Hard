import * as express from 'express'
import * as ordersByConsumer from '../services/ordersByConsumer'

const router = express.Router()

/**
 * Retrieves a list of orders related to a particular user whom
 * is the consumer.
 */
router.get('/:userId', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const userId: number = req.params.userId as unknown as number

    try {
        const result = await ordersByConsumer.getConsumerOrdersByUserId(userId)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

export default router
