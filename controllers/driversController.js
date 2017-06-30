const Driver = require('../models/driverModel');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      // geoJSON location
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      // units measured in meters, 2000000 meters or 200km
      { spherical: true, maxDistance: 2000000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;
    
    // create in this instance is a mongoose method, not our create middleware
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      // cant send just updated driver, have to go back into 
      // database again to find and send updated driver
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndRemove({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};