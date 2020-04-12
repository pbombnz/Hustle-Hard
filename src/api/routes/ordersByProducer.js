const express = require('express');
const ordersByProducer = require('../services/ordersByProducer');

const router = new express.Router();


/**
 * Retrieves a list of orders related to a particular user whom 
 * is the prodcuer.
 */
router.get('/:userId', async (req, res, next) => {
  const options = {
    userId: req.params['userId']
  };

  try {
    const result = await ordersByProducer.getProducerOrdersByUserId(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
