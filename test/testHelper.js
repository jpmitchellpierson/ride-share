const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/ride-share-test');
  mongoose.connection
    .once('open', () => done())
    .on('error', () => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    // need below .then() b/c every before each test we drop the collection
    // along with all the indeces which are never recreated
    // below ensures there is always an index
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});