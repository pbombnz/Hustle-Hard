import snakeCaseKeys from 'snakecase-keys'
import { flatten } from 'flat'
import _ from 'lodash'

import * as Entity from '../../definitions'

import knex from '../../lib/db'
import ServerError from '../../lib/error'

const getListingDetails = async (id: number): Promise<Entity.ListingAuction | Entity.ListingClassified | Entity.ListingMQL> => {
    // Get listing's type-specific details
    const auction: Entity.ListingAuction[] = await knex.select('*').from('listing_auction').where('id', id)
    const classified: Entity.ListingClassified[] = await knex.select('*').from('listing_classified').where('id', id)
    const mql: Entity.ListingMQL[] = await knex.select('*').from('listing_mql').where('id', id)

    if (auction.length === 1) {
        return auction[0]
    } else if (classified.length === 1) {
        return classified[0]
    } else if (mql.length === 1) {
        return mql[0]
    } else {
        // A listing SHOULD always have ONE set of details.
        if ((auction.length + classified.length + mql.length) > 1) {
            // Too many details detected.
            throw new Error(`Listing with ID ${id} has more than one set of type-specific details.`)
        } else {
            // No details detected.
            throw new Error(`Listing with ID ${id} has no type-specific details.`)
        }
    }
}

/**
 * @param {Listing~Create} data
 * @throws {Error}
 * @return {Promise}
 */
export const createListing = async (data: Entity.Listing): Promise<any> => {
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
export const getListings = async (): Promise<{status: number; data: Entity.Listing[]}> => {
    try {
        const listings: Entity.Listing[] = await knex.select('*').from('listings')
        //for (const listing of listings) {
        //    listing._details = listing.id ? await getListingDetails(listing.id) : undefined
        //}

        return {
            status: 200,
            data: listings
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
export const getListing = async (id: number): Promise<{ status: number; data: Entity.Listing}> => {
    const res = await knex.select('*').from('listings').where('id', id)
    if (res.length === 0) {
        throw new ServerError({
            code: 400,
            error: `No listing found with ID ${id}.`
        })
    }
    const listing: Entity.Listing = res[0]
    // try {
    //     listing._details = await getListingDetails(id)
    // } catch (error) {
    //     throw new ServerError({
    //         status: 500,
    //         error: error.message
    //     })
    // }

    return {
        status: 200,
        data: listing
    }
}

/**
 * @param {number} id
 * @param {Entity.Listing} data
 * @throws {Error}
 * @return {Promise}
 */
export const updateListing = async (id: number, data: Entity.Listing): Promise<any> => {
    if (data.id) { delete data.id }
    if (data.status === null) { delete data.status }
    if (data.createdOn === null) { delete data.createdOn }
    if (data.photoIds === null) { delete data.photoIds }
    // if (data._details) {
    //     flatten(snakeCaseKeys(data._details), { delimiter: '__' })
    //     // Unflatten details to __
    //     // FInd which detail to update
    //     // Update details
    // }
    await knex('listings').update(data)

    return {
        status: 200,
        data: 'updateListing ok!'
    }
}
