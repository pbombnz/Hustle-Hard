import ServerError from '../../lib/error'
/**
 * @param {Object} options
 * @param {String} options.id
 * @throws {Error}
 * @return {Promise}
 */
export const getFile = async (options: Record<string, any>): Promise<Record<string, any>> => {
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
        data: 'getFile ok!'
    }
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const uploadFile = async (options: Record<string, any>): Promise<Record<string, any>> => {
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
        data: 'uploadFile ok!'
    }
}
