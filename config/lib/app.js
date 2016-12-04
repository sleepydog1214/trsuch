'use strict';

var mongoose = require('./mongoose'),
    express  = require('./express');

module.exports.init = function init(callback) {
  mongoose.connect(function(db) {
    var app = express.init(db);
    callback(app);
  });
}

module.exports.start = function start(callback) {
  var self = this;

  self.init(function(app){

    app.listen(8080);
    console.log("App listening on port 8080");
  });
}
