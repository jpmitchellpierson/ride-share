// import and create express object
const express = require('express');
// routes is a function that we import
const routes = require('./routes/routes');
// create app object
const app = express();

// call imported routes function passing in the app object
routes(app);

module.exports = app;
