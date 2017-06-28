const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    Boolean,
    default: false
  }
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;