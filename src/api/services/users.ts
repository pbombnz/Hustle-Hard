import { User, Listing } from '../../definitions'

import knex from '../../lib/db'
import ServerError from '../../lib/error'
import * as ObjectUtils from '../../lib/objectUtils'

import camelcaseKeys from 'camelcase-keys'
import { getListing } from './listings'
import snakecaseKeys from 'snakecase-keys'

/**
 * @param {User} data
 * @throws {Error}
 * @return {Promise}
 */
export const registerUser = async (data: User): Promise<{ status: number; data: any }> => {
    const immutableCols: RegExp[] = [/^banned$/, /^bannedBy$/, /^bannedReason$/, /^createdOn$/, /^id$/, /^roles$/]
    if (ObjectUtils.isMatch(data, immutableCols)) {
        throw new ServerError({
            status: 400,
            error: `The following fields cannot be updated: ${immutableCols.join(', ').replace(/[/^$]/g, '')}`
        })
    }

    data = snakecaseKeys(data)

    // Create User and User role
    await knex().insert(data).into('users')
    await knex()
        // eslint-disable-next-line @typescript-eslint/camelcase
        .insert({ role_id: knex.raw('select get_user_role_type_id(\'USER\')') })
        .into('user_roles')

    return {
        status: 200,
        data: {
            success: true
        }
    }
}

export const getUserRoles = async (id: number): Promise<{ status: number; data: { roles: string[] } }> => {
    let userRoles = await knex
        .select(
            knex.ref('value').withSchema('user_roles_t')
        )
        .from('user_roles_t')
        .innerJoin('user_roles', 'user_roles_t.id', '=', 'user_roles.role_id')
        .where('user_roles.user_id', id)
    userRoles = userRoles.map((role) => role.value)
    return {
        status: 200,
        data: { roles: userRoles }
    }
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const getUser = async (options: { id?: number; username?: string; email?: string}): Promise<{ status: number; data: User }> => {
    // Retrieve the user information.
    const users = await knex.select().from('users').where(options)

    // Throw an error if no user was found.
    if (users.length === 0) {
        throw new ServerError({
            status: 400,
            error: 'Cannot find a user associated with the query specified.'
        })
    }

    // Retrieve the user's role information.
    const user = users[0]
    user.roles = await getUserRoles(user.id)
    return {
        status: 200,
        data: camelcaseKeys(user, { deep: true })
    }
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const updateUser = async (id: number, data: User): Promise<Record<string, any>> => {
    const immutableCols: RegExp[] = [/^banned$/, /^bannedBy$/, /^bannedReason$/, /^createdOn$/, /^id$/, /^roles$/]
    if (ObjectUtils.isMatch(data, immutableCols)) {
        throw new ServerError({
            status: 400,
            error: `The following fields cannot be updated: ${immutableCols.join(', ').replace(/[/^$]/g, '')}`
        })
    }

    data = snakecaseKeys(data)

    await knex('users').update(data).where('id', id)

    return {
        status: 200,
        data: 'User details updated successfully'
    }
}

/**
 * @param {number} userId
 * @throws {Error}
 * @return {Promise}
 */
export const getUserListingWatchlist = async (userId: number): Promise<{ status: number; data: Listing[]}> => {
    const res: Record<'listing_id', number>[] = await knex.select('listing_id').from('users_listing_watchlist').where('user_id', userId)
    const listingIds: number[] = res.map((object) => object.listing_id)
    const listings: Listing[] = []

    // Get listing information for each ID.
    for (const id of listingIds) {
        listings.push((await getListing(id)).data)
    }

    return {
        status: 200,
        data: listings
    }
}
