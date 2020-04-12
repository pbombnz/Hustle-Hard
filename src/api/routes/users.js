const express = require('express');
const users = require('../services/users');

const router = new express.Router();


/**
 * Registers a new user.
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await users.registerUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Returns the authenicated user's own information.
 */
router.get('/', async (req, res, next) => {
  // if(!req.isAuthenticated()) {
  //   return res.status(401).json({ message: "Not authenicated. Please login first." })
  // }
  return res.status(200).json(req.user);

  const options = {
  };

  try {
    const result = await users.getUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Returns the authenicated user's own information.
 */
router.put('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await users.updateUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * A user may watch a listing to get reminders when the listing 
 * is expiring and/or if they have been outbidded. This action 
 * is similar to user bookmarking a webpage in a browser.
 */
router.get('/watchlists', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await users.getUserListingWatchlist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
