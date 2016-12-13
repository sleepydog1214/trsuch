/*********************************************************************
 The MIT License (MIT)

 Copyright (c) 2016 Thomas Suchyta

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*********************************************************************/

/*********************************************************************
 * config/lib/app.js
 *
 * Functions to initialize express.js and mongoose.js
 *
 * init() - Initialize mongoose and express
 * start() - Start the server
*********************************************************************/
'use strict';

var mongoose = require('./mongoose'),
    express  = require('./express');

/*********************************************************************
 * init() - Connect to the mongo db, initialize express, then callback
 *          to start server.
*********************************************************************/
module.exports.init = function init(callback) {
  mongoose.connect(function(dbTrsuch, dbCode) {
    var app = express.init(dbTrsuch, dbCode);
    callback(app);
  });
}

/*********************************************************************
 * start() - Start initialization, then start the server.
*********************************************************************/
module.exports.start = function start() {
  var self = this;

  self.init(function(app){
    app.listen(8080);
    console.log("App listening on port 8080");
  });
}
