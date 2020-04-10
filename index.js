'use strict';

// Debug
const { getRoutes } = require('get-routes');
const debug = require('debug')
debug.enable('*')

// Basic Server
var http = require("http");
var path = require("path");
var oas3Tools = require('oas3-tools');

// Database
const db = require('./db');

// Authentication / Passport 
const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

var serverPort = 8080;

// swaggerRouter configuration
var options = {
    controllers: path.join(__dirname, './controllers')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const res = await db.query('SELECT password FROM users WHERE username = $1', [username])
            const hash = res.rows[0].password;
            const match = await bcrypt.compare(password, hash)
            if (match) {
                return done(null, await db.getUserByUsername(username))
            } else {
                return done(null, false, { message: 'Incorrect username and/or password.' })
            }
        } catch(error) {
            return done(error)
        }
    })
)

passport.serializeUser(async function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await db.getUserById(id);
    done(null, user);
});

expressAppConfig.addValidator();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

console.log('AppRoutes:', getRoutes(app))

