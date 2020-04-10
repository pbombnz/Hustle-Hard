'use strict';

var utils = require('../utils/writer.js');
var Listing = require('../service/ListingService');

module.exports.createListing = function createListing (req, res, next, body) {
  Listing.createListing(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createListingBid = function createListingBid (req, res, next, body, id) {
  Listing.createListingBid(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getListing = function getListing (req, res, next, id) {
  Listing.getListing(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getListingBiddings = function getListingBiddings (req, res, next, id) {
  Listing.getListingBiddings(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getListings = function getListings (req, res, next, sort) {
  Listing.getListings(sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateListing = function updateListing (req, res, next, id) {
  Listing.updateListing(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
