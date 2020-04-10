'use strict';


/**
 * Creates an order based on listing won (for auctions) or purchased (for MQLs).
 * The operation is generally not performed by a user
 *
 * body Entity_Order  (optional)
 * no response value expected for this operation
 **/
exports.createOrder = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieves a list of orders related to a particular user whom is the consumer.
 *
 * userId Long 
 * returns Entity_Order
 **/
exports.getConsumerOrdersByUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "phoneNumberE164" : "phoneNumberE164",
  "statusDelivered" : false,
  "statusMessage" : "statusMessage",
  "statusPaymentRecieved" : false,
  "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
  "statusConfirmed" : false,
  "statusCompleted" : false,
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "deliveryAddress" : "deliveryAddress",
  "statusProcessed" : false,
  "user" : "",
  "items" : [ {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  }, {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  } ],
  "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieves an order relating a the order ID suppied in the path.
 *
 * id Long 
 * returns Entity_Order
 **/
exports.getOrderById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "phoneNumberE164" : "phoneNumberE164",
  "statusDelivered" : false,
  "statusMessage" : "statusMessage",
  "statusPaymentRecieved" : false,
  "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
  "statusConfirmed" : false,
  "statusCompleted" : false,
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "deliveryAddress" : "deliveryAddress",
  "statusProcessed" : false,
  "user" : "",
  "items" : [ {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  }, {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  } ],
  "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieves all orders of the authenticated user.
 *
 * returns inline_response_200
 **/
exports.getOrders = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "producer" : [ null, null ],
  "consumer" : [ {
    "phoneNumberE164" : "phoneNumberE164",
    "statusDelivered" : false,
    "statusMessage" : "statusMessage",
    "statusPaymentRecieved" : false,
    "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
    "statusConfirmed" : false,
    "statusCompleted" : false,
    "dateCreated" : "2000-01-23T04:56:07.000+00:00",
    "deliveryAddress" : "deliveryAddress",
    "statusProcessed" : false,
    "user" : "",
    "items" : [ {
      "quantity" : 0,
      "price" : 6.027456183070403,
      "listing" : {
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
      }
    }, {
      "quantity" : 0,
      "price" : 6.027456183070403,
      "listing" : {
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
      }
    } ],
    "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
  }, {
    "phoneNumberE164" : "phoneNumberE164",
    "statusDelivered" : false,
    "statusMessage" : "statusMessage",
    "statusPaymentRecieved" : false,
    "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
    "statusConfirmed" : false,
    "statusCompleted" : false,
    "dateCreated" : "2000-01-23T04:56:07.000+00:00",
    "deliveryAddress" : "deliveryAddress",
    "statusProcessed" : false,
    "user" : "",
    "items" : [ {
      "quantity" : 0,
      "price" : 6.027456183070403,
      "listing" : {
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
      }
    }, {
      "quantity" : 0,
      "price" : 6.027456183070403,
      "listing" : {
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
      }
    } ],
    "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieves a list of orders related to a particular listing.
 * Only the producer and/or listing owner can perform this call.
 *
 * listingId Long 
 * returns Entity_Order
 **/
exports.getOrdersByListingId = function(listingId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "phoneNumberE164" : "phoneNumberE164",
  "statusDelivered" : false,
  "statusMessage" : "statusMessage",
  "statusPaymentRecieved" : false,
  "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
  "statusConfirmed" : false,
  "statusCompleted" : false,
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "deliveryAddress" : "deliveryAddress",
  "statusProcessed" : false,
  "user" : "",
  "items" : [ {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  }, {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  } ],
  "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieves a list of orders related to a particular user whom is the prodcuer.
 *
 * userId Long 
 * returns Entity_Order
 **/
exports.getProducerOrdersByUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "phoneNumberE164" : "phoneNumberE164",
  "statusDelivered" : false,
  "statusMessage" : "statusMessage",
  "statusPaymentRecieved" : false,
  "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
  "statusConfirmed" : false,
  "statusCompleted" : false,
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "deliveryAddress" : "deliveryAddress",
  "statusProcessed" : false,
  "user" : "",
  "items" : [ {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  }, {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  } ],
  "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an order by the Order ID supplied.
 *
 * body Entity_Order  (optional)
 * id Long 
 * returns Entity_Order
 **/
exports.updateOrder = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "phoneNumberE164" : "phoneNumberE164",
  "statusDelivered" : false,
  "statusMessage" : "statusMessage",
  "statusPaymentRecieved" : false,
  "dateUpdated" : "2000-01-23T04:56:07.000+00:00",
  "statusConfirmed" : false,
  "statusCompleted" : false,
  "dateCreated" : "2000-01-23T04:56:07.000+00:00",
  "deliveryAddress" : "deliveryAddress",
  "statusProcessed" : false,
  "user" : "",
  "items" : [ {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  }, {
    "quantity" : 0,
    "price" : 6.027456183070403,
    "listing" : {
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
    }
  } ],
  "statusUpdated" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

