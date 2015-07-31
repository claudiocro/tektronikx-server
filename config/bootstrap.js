/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  var insertTestData = function(cb){
    Catalog.create([
      {year: 1952,name:'Tektroniks Standart Catalog', storageid:'std-1952-1'},
      {year: 1953,name:'Tektroniks Standart Catalog', storageid:'std-1953-1'},
      {year: 1954,name:'Tektroniks Standart Catalog', storageid:'std-1954-1'},
      {year: 1955,name:'Tektroniks Standart Catalog', storageid:'std-1955-1'},
      {year: 1956,name:'Tektroniks Standart Catalog', storageid:'std-1956-1'},
      {year: 1957,name:'Tektroniks Standart Catalog', storageid:'std-1957-1'},
      {year: 1958,name:'Tektroniks Standart Catalog', storageid:'std-1958-1'},
      {year: 1959,name:'Tektroniks Standart Catalog', storageid:'std-1959-1'},
      {year: 1960,name:'Tektroniks Standart Catalog', storageid:'std-1960-1'},
      {year: 1961,name:'Tektroniks Standart Catalog', storageid:'std-1961-1'}
    ]).exec(function createCatalogs(err, created){
      //if ( err ) return res.serverError( err );

      console.log('created Catalogs: ' + created.length);


      Modelhit.create([
        {model: 'TEK-OSX 01',name:'Tektroniks osx model 01', start:1952, last:1961,page:2},
        {model: 'TEK-OSX 02',name:'Tektroniks osx model 02', start:1952, last:1955,page:9},
        {model: 'AMS-TSK Z0',name:'Altitude mass sensor series z', start:1952, last:1955,page:7},
        {model: 'AMS-BSK G7',name:'Altitude mass sensor series g', start:1952, last:1961,page:2},
        {model: 'RAS Radeon',name:'Radeon RAS', start:1958, last:1961,page:0},
        {model: 'Querz FMT', start:1956, last:1960,page:1}
      ]).exec(function createModelhits(err, created){
        //if ( err ) return res.serverError( err );

        console.log('created Modelhits: ' + created.length);

        cb();
      });

    });
  };

  Catalog.find({storageid:'std-1952-1'}).exec(function(err, catalog) {
    if (catalog.length !== 0) { return cb(); }

    insertTestData(cb);

  });
};
