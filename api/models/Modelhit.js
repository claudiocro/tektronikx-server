/**
* Modelhit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // Relationships
    modelpages: {
        collection: 'modelpage',
        via: 'model'
    },

    model : { type: 'string' },

    name : { type: 'string' },

    foundin : { type: 'integer' },

    start : { type: 'integer' },

    last : { type: 'integer' },

    page : { type: 'integer' },

    page1 : { type: 'integer' },

    tag : { type: 'string' }
  }
};

