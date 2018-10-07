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
  registrationId: {
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
    type: Number,
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
  },
  ranking: {
    type: Number,
    min: 1,
    required: false
  },
  advancable: {
    type: Boolean,
    default: false
  }
});

schema.virtual('competitor', {
  ref: 'Person',
  localField: 'competitorId',
  foreignField: 'id',
  justOne: true
});

module.exports = mongoose.model('Result', schema, 'results');