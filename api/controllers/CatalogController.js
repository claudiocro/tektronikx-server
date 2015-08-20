/**
 * CatalogController
 *
 * @description :: Server-side logic for managing catalogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');

module.exports = {
  image: function image(req, res) {

    if(sails.config.filestore.adapter === 'disk') {
      var emberApp = __dirname + '/../../' + req._sails.config.filestore.path + '/'+req.param('catalog') +'/page-'+req.param('page') + '.jpg';
      fs.exists(emberApp, function (exists) {
        if (!exists) {
          return res.notFound('The requested file does not exist.');
        }

        fs.createReadStream(emberApp).pipe(res);
      });
    } else if (sails.config.filestore.adapter === 'aws-s3'){
      var AWS = require('aws-sdk');
      var s3 = new AWS.S3();
      var fsconfig = sails.config.filestore;
      var params = {
        Bucket: fsconfig.bucket,
        Key: fsconfig.pages+'/'+req.param('catalog') +'/page-'+req.param('page') + '.jpg'};
      s3.getSignedUrl('getObject', params, function (err, url) {
        if ( err ) return res.serverError( err );

        res.redirect(url);
      });

    }
  }
};
