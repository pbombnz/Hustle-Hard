'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');

module.exports.createOrder = function createOrder (req, res, next, body) {
  Order.createOrder(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getConsumerOrdersByUserId = function getConsumerOrdersByUserId (req, res, next, userId) {
  Order.getConsumerOrdersByUserId(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next, id) {
  Order.getOrderById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrders = function getOrders (req, res, next) {
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrdersByListingId = function getOrdersByListingId (req, res, next, listingId) {
  Order.getOrdersByListingId(listingId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProducerOrdersByUserId = function getProducerOrdersByUserId (req, res, next, userId) {
  Order.getProducerOrdersByUserId(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateOrder = function updateOrder (req, res, next, body, id) {
  Order.updateOrder(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
