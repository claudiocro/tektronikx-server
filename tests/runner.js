'use strict';

var glob = require('glob');
var Mocha = require('mocha');


global.DOMAIN = 'http://localhost';
global.PORT = 1420;
global.HOST = DOMAIN + ':' + PORT;


var mocha = new Mocha({
  timeout:  18000,
  reporter: 'spec'
});

var root = 'tests/{unit,acceptance}';

function addFiles(mocha, files) {
  glob.sync(root + files).forEach(mocha.addFile.bind(mocha));
}

addFiles(mocha, '/**/*-test.js');

mocha.run(function(failures) {
  process.exit(failures);
});
