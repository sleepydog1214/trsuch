'use strict';

var express = require('express');
var router  = express.Router();

router.get('/source', function(req, res, next) {
  res.render('source', {});
});

router.get('/sources', function(req, res, next) {
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
    res.json(items);
  });
});

router.get('/source/:id', function(req, res, next) {
  var db = req.db;
  var algorithms = db.model('Algorithms',
                            { name: String,
                              type: String,
                              location: String,
                              description: String },
                            'algorithms');

  var id = req.params.id;

  algorithms.findById(id, function(err, item) {
    if (err) {
      console.log('db find error: ' + err);
    }
    res.json(item);
  });
});

module.exports = router;
