'use strict';

// Debug
const debug = require('debug');
debug.enable('*');

// Security
var helmet = require('helmet');

// Database
const db = require('./db');

// Express Related
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../lib/config');
const logger = require('../lib/logger');

// Authentication / Passport 
const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const log = logger(config.logger);
const app = express();

app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
  secret: 'secrect',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  name: 'SESSIONID'
}))
app.use(passport.initialize());
app.use(passport.session());

/* 
 * Passport Strategies
 */
passport.serializeUser(async function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = await db.getUserById(id);
  console.log(user);
  done(null, user);
});

passport.use(new LocalStrategy(
  async (username, password, done) => {
      try {
          const res = await db.query('SELECT password FROM users WHERE username = $1', [username])
          const hash = res.rows[0].password;
          const match = await bcrypt.compare(password, hash)
          if (match) {
              return done(null, await db.getUserByUsername(username))
          } else {
              return done(null, false)
          }
      } catch(error) {
          return done(error)
      }
  })
)


/*
 * Routes
 */
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/listings', require('./routes/listings'));
app.use('/listing', require('./routes/listing'));
app.use('/orders', require('./routes/orders'));
app.use('/ordersByConsumer', require('./routes/ordersByConsumer'));
app.use('/ordersByProducer', require('./routes/ordersByProducer'));
app.use('/ordersByListing', require('./routes/ordersByListing'));
app.use('/files', require('./routes/files'));

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});


module.exports = app;
