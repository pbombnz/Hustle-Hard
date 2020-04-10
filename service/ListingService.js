'use strict';


/**
 * Create a new listing
 *
 * body Entity_Listing  (optional)
 * no response value expected for this operation
 **/
exports.createListing = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * A user can place a bidding on listing.
 *
 * body Body_1  (optional)
 * id Integer 
 * no response value expected for this operation
 **/
exports.createListingBid = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve the listing that matches the specfiied ID.
 *
 * id Integer 
 * returns Entity_Listing
 **/
exports.getListing = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photo_ids" : [ "photo_ids", "photo_ids" ],
  "statusUpdatedOn" : "2000-01-23T04:56:07.000+00:00",
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "subtitle" : "subtitle",
  "description" : "description",
  "id" : 0,
  "statusUpdatedBy" : 1,
  "type" : "AUCTION",
  "category" : {
    "id" : 6,
    "type" : "GENERAL",
    "category" : "category"
  },
  "title" : "title",
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all biddings related to auction-based listings
 *
 * id Integer 
 * returns Entity_ListingBidding
 **/
exports.getListingBiddings = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "bidAmount" : 0.8008281904610115,
  "username" : "username"
}, {
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "bidAmount" : 0.8008281904610115,
  "username" : "username"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a list of listings
 *
 * sort List  (optional)
 * no response value expected for this operation
 **/
exports.getListings = function(sort) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update a listing
 *
 * id Integer 
 * no response value expected for this operation
 **/
exports.updateListing = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

