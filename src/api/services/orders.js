const ServerError = require('../../lib/error')
/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getOrders = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'getOrders ok!'
    }
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createOrder = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'createOrder ok!'
    }
}

/**
 * @param {Object} options
 * @param {Integer} options.id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getOrderById = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'getOrderById ok!'
    }
}

/**
 * @param {Object} options
 * @param {Integer} options.id
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updateOrder = async (options) => {
    // Implement your business logic here...
    //
    // This function should return as follows:
    //
    // return {
    //   status: 200, // Or another success code.
    //   data: [] // Optional. You can put whatever you want here.
    // };
    //
    // If an error happens during your business logic implementation,
    // you should throw an error as follows:
    //
    // throw new ServerError({
    //   status: 500, // Or another error code.
    //   error: 'Server Error' // Or another error message.
    // });

    return {
        status: 200,
        data: 'updateOrder ok!'
    }
}
