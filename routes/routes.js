const DriversController = require('../controllers/driversController');

module.exports = (app) => {
  // Watch for incoming requests of method GET 
  // to the route http://localhost:3050/api
  app.get('/api', DriversController.greeting);

  // when request to drivers route is made, run create function
  app.post('/api/drivers', DriversController.create);
  app.put('api/drivers/:id', DriversController.edit);
  app.delete('api/drivers/:id', DriversController.delete);
  app.get('/api/drivers', DriversController.index);
};