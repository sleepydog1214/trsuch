'use strict';

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
  var db = req.db;
  var algorithms = db.model('Algorithms',
                            { name: String,
                              type: String,
                              location: String,
                              description: String },
                            'algorithms');
  algorithms.find(function(err, items) {
      if (err) {
        console.log('db find error: ' + err);
      }
      else {
        console.log('Items' + items);
      }
  });

  res.render('index', {});
});

router.get('/index*', function(req, res, next) {
  res.render('index', {});
});

module.exports = router;
