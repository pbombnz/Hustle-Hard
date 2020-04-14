import { query } from '../../lib/db'
import format from 'pg-format'
import ServerError from '../../lib/error'

import camelcaseKeys from 'camelcase-keys'

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const registerUser = async (options: Record<string, any>): Promise<Record<string, any>> => {
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
        data: 'registerUser ok!'
    }
}

/**
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const getUser = async (options: { id?: number; username?: string; email?: string}): Promise<Record<string, any>> => {
    // Produce WHERE condition based on options paraemter.
    const optionsEntries = Object.entries(options)
    const strBuilder = [' ']
    const fmtArgs = []
    for (let i = 0; i < optionsEntries.length; i++) {
        strBuilder.push('u.%I = %L', ' AND ')
        fmtArgs.push(...optionsEntries[i])
    }
    // Remove last/trailing ' AND ' element.
    strBuilder.pop()
    const sqlWhereCondition: string = format(strBuilder.join(), ...fmtArgs)

    const sql = format(
        'SELECT u.id, uatt.value as login_method, u.username, u.password, u.given_name, u.family_name, u.email, u.address, u.phone_number_e164, u.created_on, u.banned, u.banned_by, u.banned_reason ' +
        'FROM users u ' +
        'INNER JOIN user_account_types_t uatt ON uatt.id = u.account_type ' +
        'WHERE ' + sqlWhereCondition
    )
    const userResults = await query(sql)

    if (userResults.rowCount === 0) {
        throw new ServerError({
            status: 400,
            error: 'Cannot find a user associated with the query specified.'
        })
    }

    const user = userResults.rows[0]
    const userRolesResults = await query(
        'SELECT urt.value as role ' +
        'FROM user_roles ur ' +
        'INNER JOIN user_roles_t urt ON ur.role_id = urt.id ' +
        'WHERE ur.user_id = $1', [user.id])
    user.roles = userRolesResults.rows.map((value) => value.role)

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
 * @param {Object} options
 * @throws {Error}
 * @return {Promise}
 */
export const getUserListingWatchlist = async (options: Record<string, any>): Promise<Record<string, any>> => {
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
