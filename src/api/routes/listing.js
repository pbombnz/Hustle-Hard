const express = require('express');
const listing = require('../services/listing');

const router = new express.Router();


/**
 * Get all biddings related to auction-based listings
 */
router.get('/:id/biddings', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await listing.getListingBiddings(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * A user can place a bidding on listing.
 */
router.post('/:id/biddings', async (req, res, next) => {
  const options = {
    body: req.body,
    id: req.params['id']
  };

  try {
    const result = await listing.createListingBid(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
