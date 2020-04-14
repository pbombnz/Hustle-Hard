const express = require('express')
const listing = require('../services/listing')

const middleware = require('../../lib/middleware')

const router = new express.Router()

/**
 * Get all biddings related to auction-based listings
 */
router.get('/:id/biddings', async (req, res, next) => {
    try {
        const result = await listing.getListingBiddings(req.params.id)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        next(err)
    }
})

/**
 * A user can place a bidding on listing.
 */
router.post('/:id/biddings', middleware.auth.isAuthenticated, async (req, res, next) => {
    try {
        const result = await listing.createListingBid(req.params.id, req.user.id, req.body.bidAmount)
        res.status(result.status || 200).send(result.data)
    } catch (err) {
        next(err)
    }
})

module.exports = router
