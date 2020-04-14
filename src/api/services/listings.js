const pgFormat = require('pg-format')
const snakeCaseKeys = require('snakecase-keys')

const db = require('../../lib/db')

const ServerError = require('../../lib/error')

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
module.exports.createListing = async (data) => {
    if (data.status === null) { delete data.status }
    if (data.createdOn === null) { delete data.createdOn }
    if (data.photoIds === null) { delete data.photoIds }

    data = snakeCaseKeys(data)
    const dataEntries = Object.entries(data)
    const identifiers = []
    const literals = []
    const keys = []
    const values = []
    for (let i = 0; i < dataEntries.length; i++) {
        identifiers.push('%I')
        literals.push('%L')
        keys.push(dataEntries[i][0])
        values.push(dataEntries[i][1])
    }
    const sql = pgFormat(`INSERT INTO listings(${identifiers.join(', ')}) VALUES (${literals.join(', ')}) RETURNING id`, ...keys, ...values)

    try {
        const res = await db.query(sql)
        if (res.rowCount === 0) {
            throw new ServerError({
                code: 400,
                message: 'The listing could not be created.'
            })
        }
        return {
            status: 200,
            data: { id: res.rows[0].id }
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
module.exports.getListings = async () => {
    try {
        const res = await db.query('SELECT * FROM listings')
        return {
            status: 200,
            data: res.rows
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
module.exports.getListing = async (id) => {
    try {
        const res = await db.query('SELECT * FROM listings WHERE id = $1', [id])
        if (res.rowCount === 0) {
            throw new ServerError({
                code: 400,
                error: `No listing found with ID ${id}.`
            })
        }
        return {
            status: 200,
            data: res.rows[0]
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
module.exports.updateListing = async (id, body) => {
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
