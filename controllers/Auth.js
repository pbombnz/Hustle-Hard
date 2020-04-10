'use strict';

var utils = require('../utils/writer.js');
var Auth = require('../service/AuthService');
const passport = require("passport");

module.exports.authUserViaEmail = [passport.authenticate('local'), (req, res, next) => {
  console.log(req)
  if(true) {
    
  }
  Auth.authUserViaEmail(username, password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
}];

module.exports.authUserViaPKI = function authUserViaPKI (req, res, next) {
  Auth.authUserViaPKI()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  Auth.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
