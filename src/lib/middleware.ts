import ServerError from '../lib/error'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.user) {
        return next()
    }
    return next(new ServerError({
        status: 401,
        error: 'User is not authenticated'
    }))
}

const isNotAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
        return next()
    }
    return next(new ServerError({
        status: 401,
        error: 'User is already authenticated'
    }))
}

export default {
    auth: {
        isAuthenticated,
        isNotAuthenticated
    }
}
