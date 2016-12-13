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
 * modules/server/routes/cv.js
 *
 * Functions controlling routes for the curriculum vitae page
 *
 * GET / - Render home page
 * GET /data - Get data from the trsuch db and the cv collection
*********************************************************************/
'use strict';

var express = require('express');
var router  = express.Router();

/*********************************************************************
 * GET / - Render cv page
*********************************************************************/
router.get('/', function(req, res, next) {
  res.render('cv', {});
});

/*********************************************************************
 * GET /data - Get data from the cv collection
*********************************************************************/
router.get('/data', function(req, res, next) {
  var dbTrsuch = req.dbTrsuch;

  var cv = dbTrsuch.model('CV', {
  name: String,
  title: String,
  summary: String,
  experienceTitle: String,
  experienceDates: String,
  experiencecompany: String,
  experience: Array,
  keyskills: Array,
  technicalSkills: Object,
  educationLocation: String,
  education: String
  }, 'cv');

  cv.find(function(err, items){
    if (err) {
      console.log('db find error: ' + err);
    }
    res.json(items);
  });
});

module.exports = router;
