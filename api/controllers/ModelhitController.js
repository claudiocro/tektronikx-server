/**
 * ModelhitController
 *
 * @description :: Server-side logic for managing modelhits
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var util = require( 'util' ),
  actionUtil = require( 'sails-generate-ember-blueprints/templates/basic/api/blueprints/_util/actionUtil' );


var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {
  find: function findRecords( req, res ) {

  // Look up the model
  var Model = actionUtil.parseModel( req );

  /* ENABLE if needed ( see https://github.com/mphasize/sails-ember-blueprints/issues/3 )
   * ----------------
   * If an `id` param was specified, use the findOne blueprint action
   * to grab the particular instance with its primary key === the value
   * of the `id` param.   (mainly here for compatibility for 0.9, where
   * there was no separate `findOne` action)
   */
  // if ( actionUtil.parsePk( req ) ) {
  //  return require( './findone' )( req, res );
  // }

  // Lookup for records that match the specified criteria
  var query = Model.find()
    .where( { model: { 'like': req.param('model')+'%'}} )
    .limit( actionUtil.parseLimit( req ) )
    .skip( actionUtil.parseSkip( req ) )
    .sort( actionUtil.parseSort( req ) );

  query = actionUtil.populateEach( query, req );
  query.exec( function found( err, matchingRecords ) {
    if ( err ) return res.serverError( err );

    // Only `.watch()` for new instances of the model if
    // `autoWatch` is enabled.
    if ( req._sails.hooks.pubsub && req.isSocket ) {
      Model.subscribe( req, matchingRecords );
      if ( req.options.autoWatch ) {
        Model.watch( req );
      }
      // Also subscribe to instances of all associated models
      _.each( matchingRecords, function ( record ) {
        actionUtil.subscribeDeep( req, record );
      } );
    }

    res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
  } );
}
};

