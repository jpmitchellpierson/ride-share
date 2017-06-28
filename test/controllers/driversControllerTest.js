const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('drivers controller', () => {
  it('post to api/drivers creates a new driver', done => {
    // take the initial count of all drivers
    Driver.count().then(count => {
      // make request
      request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end(() => {
        // take new count of all drivers after request
        Driver.count().then(newCount => {
          // assert that there is one more in the database
          assert(count + 1 === newCount);
          done();
        });
      });
    }); 
  });
});