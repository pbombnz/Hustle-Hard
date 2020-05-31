import ServerError from '../../lib/error'
import knex from '../../lib/db'
/**
 * @param {Object} options
 * @param {Integer} options.userId
 * @throws {Error}
 * @return {Promise}
 */
export const getProducerOrdersByUserId = async (userId: number): Promise<{status: number; data: any}> => {
    const res = await knex.select().from('orders').where('producer_user_id', '=', userId)

    return {
        status: 200,
        data: res
    }
}
