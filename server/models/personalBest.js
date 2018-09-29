const mongoose = require('mongoose');
const { Events } = require('../helpers/wca');

const schema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    enum: Events.map((event) => event.id)
  },
  best: {
    type: Number,
    min: 0
  },
  worldRanking: {
    type: Number,
    min: 1
  },
  continentalRanking: {
    type: Number,
    min: 1
  },
  nationalRanking: {
    type: Number,
    min: 1
  },
  type: {
    type: String,
    enum: ['single', 'average']
  }
});

module.exports = schema;