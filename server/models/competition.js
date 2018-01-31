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
  startDate: {
    type: String
  },
  endDate: {
    type: Date
  },
  persons: [Person],
  events: [Event]
}, {
  _id: false
});

module.exports = mongoose.model('Competition', schema, 'competitions');
