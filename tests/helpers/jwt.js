var jwt = require('jsonwebtoken');

module.exports = function (user) {console.log(sails.config.jwt.secret);
    var expirationTimeInMinutes = 60 * 2;

    var token = jwt.sign(user, sails.config.jwt.secret, {
        expiresInMinutes: expirationTimeInMinutes
    });

    return token;
};
