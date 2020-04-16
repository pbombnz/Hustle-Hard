import knex from '../../lib/db'

import snakecaseKeys from 'snakecase-keys'

import ServerError from '../../lib/error'

/**
 * @param {!number} id The ID of a listing the bid will placed on.
 * @throws {Error} Occurs when the SQL selection failed, which happens the listing ID does not exist.
 * @return {Promise} Returns the bidding information descending by date created/bid amount.
 */
export const getListingBiddings = async (id: number): Promise<any> => {
    try {
        const res = await knex
            .select(
                knex.ref('username').withSchema('users').as('username'),
                knex.ref('bid_amount').withSchema('listing_bids').as('bid_amount'),
                knex.ref('created_on').withSchema('listing_bids').as('created_on')
            )
            .from('listing_bids')
            .innerJoin('users', 'users.user_id', '=', 'listing_bids.user_id')
            .where('listing_bids.listing_id', id)
            .orderBy('created_on', 'desc')

        if (res.length === 0) {
            throw new ServerError()
        }

        return {
            status: 200,
            data: res
        }
    } catch (err) {
        throw new ServerError({
            code: 400,
            error: `No listing associated with ID ${id}.`
        })
    }
}

/**
 * @param {!number} id The ID of a listing the bid will placed on.
 * @param {!number} userId The ID of a user who is placing the bid.
 * @param {!number} bidAmount The amount to bid.
 * @throws {Error} Occurs when the SQL insertion failed, which happens the bid placed is lower than the current bid.
 * @return {Promise} A 204 Status signalling to the user that the bid was successful.
 */
export const createListingBid = async (id: number, userId: number, bidAmount: number): Promise<any> => {
    try {
        await knex
            .insert(snakecaseKeys({ id, userId, bidAmount }))
            .into('listing_bids')
        return { status: 204 }
    } catch (err) {
        throw new ServerError({
            code: 400,
            error: 'A higher bid has already been placed for this listing.'
        })
    }
}
