const assert = require('assert');
const proxyquire = require('proxyquire');
const { productsMock, ProductsServicesMock } = require('../utils/mocks.js');
const testServer = require('../utils/testServer.js');

describe('routes - products', function() {
  const route = proxyquire('../routes/index', {
    '../services/index': ProductsServicesMock,
  });

  const request = testServer(route);
  
  describe('GET - /products', function() {
    it('should respond with status 200', function (done) {
      console.log('Buenas entre');
      request.get('/api/products').expect(200, done);
    });

    it('should respond with the list of movies', function (done) {    
      request.get('/api/products').end((err, res) => {
        assert.deepEqual(res.body, productsMock);
        done();
      })
    });
  });

});
