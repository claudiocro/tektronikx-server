var request = require('supertest');
var assert = require('assert');
var token = require('../../helpers/jwt');
var startApp = require('../../helpers/startApp');
var user = require('../../fixtures/user')[0];

describe('ModelhitController', function() {

  before(function beforeRunningAnyTests(done) {
    startApp(function afterStartingApp(error, app) {
      done(error,app);
    });
  });

  after(function afterAllTestsFinish(done) {
    sails.lower(done);
  });


  describe('#find()', function() {

    it('should return modehist search result', function (done) {

      /*sails.request({
        url: '/api/v1/modelhits?model=a',
        method: 'GET',
        params: {},
        headers: {}
      }, function(err, clientRes, body) {
        //expect(err).to.exist;
        //expect(err).to.be.instanceof(Error);
        //expect(err).to.have.property('status', 400);
        //expect(err).to.have.deep.property('body.error', 'E_VALIDATION');
        //expect(err).to.have.deep.property('body.invalidAttributes.password');
        done();
      });*/



      request(sails.hooks.http.app)
        .get('/api/v1/modelhits?model=a')
        .set('Authorization', 'Bearer ' + token(user))
        //.send({ model: 'a'})
        .expect(200)
        .end(function(err, res) {
          var result = JSON.parse(res.text);

          assert.equal(result.modelhits.length, 2);
          assert.equal(result.modelhits[0].model, 'AMS-TSK Z0');

          done();
        });
    });
  });
});
