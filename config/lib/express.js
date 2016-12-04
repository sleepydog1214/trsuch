'use strict';

var express        = require('express'),
    morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    path           = require('path'),
    routes         = require('../../modules/core/server/routes/index'),
    code           = require('../../modules/core/server/routes/code'),
    methodOverride = require('method-override');

module.exports.init = function (db) {
  var app = express();

  db.on('error', console.error.bind(console, 'connection error:'));

  app.set('views', path.join(__dirname, '../../modules/core/server/views'));
  app.set('view engine', 'pug');

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({'extended': 'true'}));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
  app.use(methodOverride());

  app.use(function(req, res, next) {
    req.db = db;
    next();
  });

  app.use(express.static(path.join(__dirname, '../../public')));
  app.use(express.static(path.join(__dirname, '../../node_modules')));
  app.use(express.static(path.join(__dirname, '../../modules/core/client/app')))

  app.use('/', routes);
  app.use('/code', code);

  return app;
}
