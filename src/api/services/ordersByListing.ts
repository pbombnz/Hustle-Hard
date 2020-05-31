import ServerError from '../../lib/error'
import knex from '../../lib/db'

/**
 * @param {Integer} listingId
 * @throws {Error}
 * @return {Promise}
 */
export const getOrdersByListingId = async (listingId: number): Promise<{status: number; data: any}> => {
    const res = await knex.select('order_id').from('order_items').where('listing_id', '=', listingId)
    const orderIds = res.map((row) => row.order_id)
    const orders = []

    for (const orderId of orderIds) {
        const order = await knex.select().from('orders').where('id', '=', orderId)
        orders.push(order)
    }
    return {
        status: 200,
        data: orders
    }
}
