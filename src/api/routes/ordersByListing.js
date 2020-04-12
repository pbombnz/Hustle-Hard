const express = require('express');
const ordersByListing = require('../services/ordersByListing');

const router = new express.Router();


/**
 * Only the producer and/or listing owner can perform this 
 * call.
 */
router.get('/:listingId', async (req, res, next) => {
  const options = {
    listingId: req.params['listingId']
  };

  try {
    const result = await ordersByListing.getOrdersByListingId(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
