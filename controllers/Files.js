'use strict';

var utils = require('../utils/writer.js');
var Files = require('../service/FilesService');

module.exports.getFile = function getFile (req, res, next, id) {
  Files.getFile(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadFile = function uploadFile (req, res, next, body) {
  Files.uploadFile(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
