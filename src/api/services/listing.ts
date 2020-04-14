import * as db from '../../lib/db'

import ServerError from '../../lib/error'

/**
 * @param {!number} id The ID of a listing the bid will placed on.
 * @throws {Error} Occurs when the SQL selection failed, which happens the listing ID does not exist.
 * @return {Promise} Returns the bidding information descending by date created/bid amount.
 */
export const getListingBiddings = async (id) => {
    try {
        const res = await db.query('SELECT u.username, lb.bid_amount, lb.created_on ' +
            'FROM listing_bids lb ' +
            'INNER JOIN users u ON lb.user_id = u.id ' +
            'WHERE listing_id=$1 ' +
            'ORDER BY created_on DESC', [id])

        if (res.rowCount === 0) {
            throw new ServerError()
        }

        return {
            status: 200,
            data: res.rows
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
export const createListingBid = async (id, userId, bidAmount) => {
    try {
        await db.query('INSERT INTO listing_bids(listing_id, user_id, bid_amount) VALUES ($1, $2, $3)', [id, userId, bidAmount])
        return { status: 204 }
    } catch (err) {
        throw new ServerError({
            code: 400,
            error: 'A higher bid has already been placed for this listing.'
        })
    }
}
