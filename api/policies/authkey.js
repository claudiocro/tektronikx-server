var expressJwt = require('express-jwt');

module.exports = expressJwt({
  secret: sails.config.jwt.authKeySecret,
  getToken: function(req) {
    return req.param('authKey');
  }});
