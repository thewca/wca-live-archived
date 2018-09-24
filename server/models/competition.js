const mongoose = require('mongoose');
const Event = require('./event');

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  shortName: {
    type: String,
    required: false
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    require: true
  },
  events: [Event]
});

module.exports = mongoose.model('Competition', schema, 'competitions');