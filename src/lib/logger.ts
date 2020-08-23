import Logger, { Stream, createLogger } from 'bunyan'

/**
 * @param {Object} config Logger configuration
 */
// export default (config: any): Logger => {
//     const bunyanConfig = []
//     const levels = Object.keys(config.levels)

//     for (const level of levels) {
//         const bunyanLevel = config.levels[level]
//         if (!bunyanLevel) continue

//         if (level === 'debug' && config.level !== 'debug') continue

//         // @ts-ignore
//         const logger: Stream = { level }

//         if (bunyanLevel === 'STDOUT') {
//             logger.stream = process.stdout
//         } else if (bunyanLevel === 'STDERR') {
//             logger.stream = process.stderr
//         } else if (bunyanLevel) {
//             logger.path = bunyanLevel
//         } else {
//             continue
//         }

//         bunyanConfig.push(logger)
//     }

//     return createLogger({ name: config.name, streams: bunyanConfig })
// }

export default () => createLogger({name: 'myapp'});
