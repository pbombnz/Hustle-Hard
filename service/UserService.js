'use strict';


/**
 * Returns the authenicated user's own information.
 *
 * returns Entity_User
 **/
exports.getUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "accountType" : "EMAIL",
  "givenName" : "givenName",
  "roles" : [ "ADMINISTRATOR", "ADMINISTRATOR" ],
  "userName" : "userName",
  "bannedReason" : "bannedReason",
  "password" : "",
  "phoneNumber" : "phoneNumber",
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "familyName" : "familyName",
  "bannedBy" : 6,
  "id" : 0,
  "banned" : false,
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a list of listings that the user is watching.
 * A user may watch a listing to get reminders when the listing is expiring and/or if they have been outbidded. This action is similar to user bookmarking a webpage in a browser.
 *
 * returns UserListingWatchlist
 **/
exports.getUserListingWatchlist = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Registers a new user.
 *
 * body Entity_User  (optional)
 * returns Entity_User
 **/
exports.registerUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "accountType" : "EMAIL",
  "givenName" : "givenName",
  "roles" : [ "ADMINISTRATOR", "ADMINISTRATOR" ],
  "userName" : "userName",
  "bannedReason" : "bannedReason",
  "password" : "",
  "phoneNumber" : "phoneNumber",
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "familyName" : "familyName",
  "bannedBy" : 6,
  "id" : 0,
  "banned" : false,
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the authenicated user's own information.
 *
 * body Entity_User  (optional)
 * returns Entity_User
 **/
exports.updateUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "address" : "address",
  "accountType" : "EMAIL",
  "givenName" : "givenName",
  "roles" : [ "ADMINISTRATOR", "ADMINISTRATOR" ],
  "userName" : "userName",
  "bannedReason" : "bannedReason",
  "password" : "",
  "phoneNumber" : "phoneNumber",
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "familyName" : "familyName",
  "bannedBy" : 6,
  "id" : 0,
  "banned" : false,
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

