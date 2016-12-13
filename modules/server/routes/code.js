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
 * modules/server/routes/code.js
 *
 * Functions tto render the algorithm and data structure pages
 *
 * GET source - Render the program list PUG html list
 * GET sources - Render the program list or an individual program
*********************************************************************/
'use strict';

var express = require('express');
var router  = express.Router();
var fs      = require('fs');

/*********************************************************************
 * GET source - Render the source.pug view
*********************************************************************/
router.get('/source', function(req, res, next) {
  res.render('source', {});
});

/*********************************************************************
 * GET sources - Render from the db either the list of programs
 *               or a specific program.
*********************************************************************/
router.get('/sources', function(req, res, next) {
  //Parse the URL to see if it contains a program id
  var originalURL = req.originalUrl;
  var regexId     = /\?sourceId=([0-9a-fA-F]+)/;
  var result      = originalURL.match(regexId);

  //Query the algorithms collection
  var dbCode = req.dbCode;
  var algorithms = dbCode.model('Algorithms',
                            { name: String,
                              type: String,
                              location: String,
                              description: String },
                            'algorithms');

  //If no id, return the complete list of algorithms
  if (result === null) {
    algorithms.find(function(err, items) {
      if (err) {
        console.log('db find error: ' + err);
      }
      res.json(items);
    });
  }

  //Else, find the algorithm by id and return its data
  else {
    var id = result[1];

    algorithms.findById(id, function(err, item) {
      if (err) {
        console.log('db find error: ' + err);
        res.json(item);
      }
      else {
        //Program code is kept in modules/client/app/code
        var code = __dirname + '/../../client/app/code/' + item.location;

        //Read the program file so it can be displayed by the client
        fs.readFile(code, 'utf8', function(err, data){
          if (err) {
            console.log('Could not open file: ' + err);
          }
          var newItem = {name: item.name,
                         type: item.type,
                         description: item.description,
                         location: '../code/' + item.location,
                         code: data
          };
          res.json(newItem);
        })
      }
    });
  }
});

module.exports = router;
