import * as Schemas from '../../definitions'

import knex from '../../lib/db'
import format from 'pg-format'
import ServerError from '../../lib/error'

import camelcaseKeys from 'camelcase-keys'

/**
 * @param {Schemas.Entity.User} data
 * @throws {Error}
 * @return {Promise}
 */
export const registerUser = async (data: Schemas.Entity.User): Promise<Record<string, any>> => {
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

    // Create User
    // const res = await query('');

    return {
        status: 200,
        data
    }
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const getUser = async (options: { id?: number; username?: string; email?: string}): Promise<Record<string, any>> => {
    // Retrieve the user information.
    const userResults = await knex
        .select(
            knex.ref('id').withSchema('users'),
            knex.ref('value').withSchema('user_account_types_t').as('type'),
            knex.ref('password').withSchema('users'),
            knex.ref('given_name').withSchema('users'),
            knex.ref('family_name').withSchema('users'),
            knex.ref('email').withSchema('users'),
            knex.ref('address').withSchema('users'),
            knex.ref('phone_number_e164').withSchema('users'),
            knex.ref('created_on').withSchema('users'),
            knex.ref('banned').withSchema('users'),
            knex.ref('banned_by').withSchema('users'),
            knex.ref('banned_reason').withSchema('users')
        )
        .from('users')
        .innerJoin('user_account_types_t', 'users.id', 'user_account_types_t.user_id')
        .where(options)

    // Throw an error if no user was found.
    if (userResults.length === 0) {
        throw new ServerError({
            status: 400,
            error: 'Cannot find a user associated with the query specified.'
        })
    }

    // Retrieve the user role information.
    const user = userResults[0]
    const userRolesResults = await knex
        .select(
            knex.ref('value').withSchema('user_roles_t').as('role')
        )
        .from('user_roles')
        .innerJoin('user_roles_t', 'user_roles_t.id', '=', 'user_roles.id')
        .where('user_roles.user_id', user.id)
    user.roles = userRolesResults.map((value) => value.role)

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
export const updateUser = async (options: Record<string, any>): Promise<Record<string, any>> => {
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
        data: 'updateUser ok!'
    }
}

/**
 * @param {number} userId
 * @throws {Error}
 * @return {Promise}
 */
export const getUserListingWatchlist = async (userId: number): Promise<any> => {
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
        data: 'getUserListingWatchlist ok!'
    }
}
