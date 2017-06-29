const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

// if not in a testing environment, connect to main db
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/ride-share');
};

app.use(bodyParser.json());
routes(app);

// use app.use to register any type of middleware with express
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
