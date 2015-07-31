/*
*
 * Test starter - with this version of sails.js we can only start one sails server,
 * to solve this problem we use only one before All and after All to start and
 * stop the server
 */

var path = require('path');
var Sails = require('sails').Sails;
var loadConfig = require('./loadConfig');

module.exports = function(done) {

  new Sails().load(loadConfig, function whenAppIsReady(error, sailsApp) {
    if (error) {
      done(error, sailsApp);
    }

    // Require barrels and load fixtures
    var Barrels = require('barrels');
    var barrels = new Barrels(path.join(process.cwd(), 'tests', 'fixtures'));

    // Populate the DB
    barrels.populate(function (error) {
      done(error, sailsApp);
    });

  });
};
