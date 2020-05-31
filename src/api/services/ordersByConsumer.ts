import ServerError from '../../lib/error'
import knex from '../../lib/db'

/**
 * @param {Integer} userId
 * @throws {Error}
 * @return {Promise}
 */
export const getConsumerOrdersByUserId = async (userId: number): Promise<{status: number; data: any}> => {
    const res = await knex.select().from('orders').where('consumer_user_id', '=', userId)

    return {
        status: 200,
        data: res
    }
}
