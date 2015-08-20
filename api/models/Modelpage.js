/**
* Modelpage.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    model : { model: 'modelhit' },

    catalog : { model: 'catalog' },

    page : { type: 'integer' },

    pagecount : { type: 'integer' }
  }
};
