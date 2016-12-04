'use strict';

var mongoose = require('mongoose');

module.exports.connect = function connect(callback) {
  mongoose.connect('mongodb://localhost:27017/code');

  var db = mongoose.connection;
  callback(db);
}
