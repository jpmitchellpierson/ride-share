const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('drivers controller', () => {
  it('POST to api/drivers creates a new driver', done => {
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

  it('PUT to api/drivers/:id edits an existing driver', done => {
    // create new driver with email not driving
    const driver = new Driver({ email: 'test@test.com', driving: false });

    driver.save().then(() => {
      // make a request to find driver with created driver's id
      request(app)
        .put(`/api/drivers/${driver._id}`)
        // change drivers driving status to true
        .send({ driving: true })
        .end(() => {
          // check if the driver was updated
          // find driver with email matching created driver
          Driver.findOne({ email: 'test@test.com' })
            // assert that driving status equals true
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
        });
    });
  });


  // pretty much same as edit
  it('DELETE to api/driver/:id deletes a driver', done => {
    const driver = new Driver({ email: 'test@test.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
            .then(driver => {
              assert(driver === null);
              done();
            });
        });
    })
  });
});