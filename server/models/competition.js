const mongoose = require('mongoose');
const Event = require('./schema/event');
const Person = require('./schema/person');

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  schedule: {
    startDate: {
      type: String
    },
    numberOfDays: {
      type: Number
    }
  },
  persons: {
    type: [Person],
    required: true
  },
  events: {
    type: [Event],
    required: true
  }
});

module.exports = mongoose.model('Competition', schema, 'competitions');
