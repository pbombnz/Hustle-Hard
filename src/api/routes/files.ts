import * as express from 'express'
import * as files from '../services/files'

const router = express.Router()

/**
 * Retrieves an image specified by the Image ID given.
 */
router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        id: req.params.id
    }

    try {
        const result = await files.getFile(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        next(err)
    }
})

/**
 *
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const options = {
        body: req.body
    }

    try {
        const result = await files.uploadFile(options)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

export default router
