const express = require('express')
const listings = require('../services/listings')

const middleware = require('../../lib/middleware')

const router = new express.Router()

/**
 * Create a new listing
 */
router.post('/', middleware.auth.isAuthenticated, async (req, res, next) => {
    req.body.createdBy = req.user.id
    try {
        const result = await listings.createListing(req.body)
        res.status(200).send(result.data)
    } catch (err) {
        return res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Retrieve a list of listings
 */
router.get('/', async (req, res, next) => {
    // const options = {
    //     sort: req.query.sort
    // }

    try {
        const result = await listings.getListings()
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        return res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Retrieve the listing that matches the specfiied ID.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const result = await listings.getListing(req.params.id)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        return res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

/**
 * Update a listing
 */
router.put('/:id', middleware.auth.isAuthenticated, async (req, res, next) => {
    const options = {
        id: req.params.id
    }

    try {
        const result = await listings.updateListing(options)
        res.status(200).send(result.data)
    } catch (err) {
        return res.status(500).send({
            status: 500,
            error: 'Server Error'
        })
    }
})

module.exports = router
