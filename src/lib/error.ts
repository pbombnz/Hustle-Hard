export default class ServerError extends Error {
    error: any
    status: number

    constructor (...args: any[]) {
        super(...args)
        Error.captureStackTrace(this, ServerError)
        this.status = args[0].status
        this.error = args[0].error
    }
}
