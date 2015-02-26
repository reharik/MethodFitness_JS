'use strict';
var fs = require('fs');
var koa = require('koa');
var mongoose = require('mongoose');
var passport = require('koa-passport');
var config = require('./config/config');

/**
 * Connect to database
 */
mongoose.connect(config.mongo.url);
mongoose.connection.on('error', function (err) {
  console.log(err);
});

/**
 * Load the models
 */
 console.log("approot" + __dirname);
 console.log("approot" + config.app.title);
var models_path = config.app.root + '/src/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('js')) {
    require(models_path + '/' + file);
  }
});

/**
 * Server
*/

var app = module.exports = koa();

require('./config/passport')(passport, config);

require('./config/koa')(app, config, passport);

// Routes
require('./src/app/routes/firstRoutes.js')(app, passport);


if (!module.parent) {
  app.listen(3000);app.listen(config.app.port);
  console.log('Server started, listening on port: ' + config.port);
}
console.log('Environment: ' + config.app.env);
