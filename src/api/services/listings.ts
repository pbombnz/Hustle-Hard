import pgFormat from 'pg-format'
import snakeCaseKeys from 'snakecase-keys'

import knex from '../../lib/db'

import ServerError from '../../lib/error'

/**
 * An object containing infomration about a Listing.
 * @typedef {Object} Listing~Create
 * @property {number} typeId
 * @property {number} categoryId
 * @property {string=} [status=ACTIVE]
 * @property {string} title
 * @property {string} subtitle
 * @property {string} description
 * @property {string=} winningInstructions
 * @property {string[]} [photoIds=[]]
 * @property {Date} expiresOn
 * @property {integer} createdBy
 * @property {Date=} createdOn
 */

/**
 * An object containing infomration about a Listing.
 * @typedef {Object} Listing~Update
 * @property {id} id
 * @property {string=} [status=ACTIVE]
 * @property {string=} title
 * @property {string=} subtitle
 * @property {string=} description
 * @property {string=} winningInstructions
 * @property {string[]=} [photoIds=[]]
 * @property {Date=} expiresOn
 */

/**
 * @param {Listing~Create} data
 * @throws {Error}
 * @return {Promise}
 */
export const createListing = async (data: Record<string, any>): Promise<any> => {
    if (data.id) { delete data.id }
    if (data.status === null) { delete data.status }
    if (data.createdOn === null) { delete data.createdOn }
    if (data.photoIds === null) { delete data.photoIds }

    try {
        const res = await knex.insert(snakeCaseKeys(data)).into('listing').returning('id')
        if (res.length === 0) {
            throw new ServerError({
                code: 400,
                message: 'The listing could not be created.'
            })
        }
        return {
            status: 200,
            // @ts-ignore
            data: { id: res[0].id }
        }
    } catch (err) {
        if (err instanceof ServerError) {
            throw err
        } else {
            throw new ServerError({
                error: err.message
            })
        }
    }
}

/**
 * @param {Object} options
 * @param {Array} options.sort
 * @throws {Error}
 * @return {Promise}
 */
export const getListings = async (): Promise<any> => {
    try {
        const res: any[] = await knex.select('*').from('listings')
        return {
            status: 200,
            data: res
        }
    } catch (err) {
        throw new ServerError({
            error: err.message
        })
    }
}

/**
 * @param {Integer} id
 * @throws {Error}
 * @return {Promise}
 */
export const getListing = async (id: number): Promise<any> => {
    try {
        const res = await knex.select('*').from('listings').where('id', id)
        if (res.length === 0) {
            throw new ServerError({
                code: 400,
                error: `No listing found with ID ${id}.`
            })
        }
        return {
            status: 200,
            data: res[0]
        }
    } catch (err) {
        if (err instanceof ServerError) {
            throw err
        } else {
            throw new ServerError({
                error: err.message
            })
        }
    }
}

/**
 * @param {number} id
 * @param {...Listing~UPDATE} body
 * @throws {Error}
 * @return {Promise}
 */
export const updateListing = async (id: number, body: Record<string, any>): Promise<any> => {
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
        data: 'updateListing ok!'
    }
}
