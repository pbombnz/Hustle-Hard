const express = require('express');
const passport = require("passport");
const auth = require('../services/auth');

const router = new express.Router();


/**
 * 
 */
router.post('/login/email', passport.authenticate('local'), async (req, res, next) => {
  /*    passport.authenticate('local', { session: true } , (err, user, info) => {
        if (err) { return next(err) }
        if(!user) { return res.status(400).send() }   

        req.login(user, (err) => {
            if (err) { return res.status(400).send(); }
            return res.status(204).send()
        })
    })(req, res, next)*/

  const options = {
    body: req.body
  };

  try {
    const result = await auth.authUserViaEmail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * 
 */
router.post('/login/pki', async (req, res, next) => {
  const options = {
  };

  try {
    const result = await auth.authUserViaPki(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * 
 */
router.post('/logout', async (req, res, next) => {
  //   if(req.isAuthenticated()) {
  //     req.logout();
  //     return res.status(204).send()
  // }
  // return res.status(401).send()
  
  const options = {
  };

  try {
    const result = await auth.logoutUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;
