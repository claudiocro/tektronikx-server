/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
var client;

if(sails.config.lightning.appKey) {
var redis = require('redis');
console.log(sails.config.lightning.port);
console.log(sails.config.lightning.host);
  client = redis.createClient(
  sails.config.lightning.port,
  sails.config.lightning.host,
  {auth_pass:sails.config.lightning.pass});
}

var getIndexKey = function(req, cb) {
  var indexKey = req.param('index_key');
  if(!indexKey) {
    client.get(sails.config.lightning.appKey+':current', function(err, reply) {
      cb(err,reply);
    });
  }
  else {
    cb(undefined, sails.config.lightning.appKey+':'+indexKey);
  }
};

var serveLightning = function(req, res) {
  getIndexKey(req, function(err, key) {
    if(err) {
      res.serverError(err);
    }
    client.get(key, function(err, page) {
      if(err) {
        res.notFound('The requested file does not exist.');
      }
      else {
        console.log(key);
        console.log(page);
        res.send(page);
      }
    });
  });
};

var serveFromFilesystem = function(req, res) {
  var emberApp = __dirname + '/../../assets/index.html';
  fs.exists(emberApp, function (exists) {
    if (!exists) {
      return res.notFound('The requested file does not exist.');
    }

    fs.createReadStream(emberApp).pipe(res);
  });
};

module.exports = {
  /**
   * `AppController.serve()`
   * Serves your Ember App directly from the assets/index.html
   *
  */

  serve: function(req, res) {
    if(sails.config.lightning.appKey) {
      serveLightning(req, res);
    } else {
      serveFromFilesystem(req, res);
    }
  }
};
