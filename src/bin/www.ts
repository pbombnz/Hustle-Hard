#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../api'
import http from 'http'
import config from '../lib/config'
import logger from '../lib/logger'

const log = logger(config.logger)

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: any): number | string | false => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
    // named pipe
        return val
    }

    if (port >= 0) {
    // port number
        return port
    }

    return false
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.api.port || '3000')
app.set('port', port)

/// Create HTTP server.
const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: any): never => {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        log.fatal(`${bind} requires elevated privileges`)
        process.exit(1)
    case 'EADDRINUSE':
        log.fatal(`${bind} is already in use`)
        process.exit(1)
    default:
        throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (): void => {
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    log.debug(`Listening on ${bind}`)
}

// Listen on provided port, on all network interfaces.
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
