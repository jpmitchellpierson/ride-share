const mongoose = require('mongoose');
const Schema= mongoose.Schema;

// Point Schema for subdocument in Driver Schema
const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: { 
    // coordinates represented in an array of numbers
    type: [Number],
    index: '2dsphere'
  }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  // assign point schema to driver schema as subdocument
  // provides the location of the driver in 2dsphere coordinates
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;