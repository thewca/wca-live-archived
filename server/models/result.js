const mongoose = require('mongoose');
const SolveTime = require('./solveTime');
const { Events } = require('../helpers/wca');

const schema = new mongoose.Schema({
  competitionId: {
    type: String,
    index: true,
    required: true
  },
  competitorId: {
    type: Number,
    required: true,
    index: true
  },
  eventId: {
    type: String,
    required: true,
    enum: Events.map((event) => event.id),
    index: true
  },
  round: {
    type: String,
    required: true,
    index: true
  },
  competitorWcaId: {
    type: String,
    required: false
  },
  solves: {
    type: [SolveTime],
    required: true
  },
  average: {
    type: SolveTime,
    required: false
  }
});

module.exports = mongoose.model('Result', schema, 'results');