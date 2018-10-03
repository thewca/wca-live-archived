const mongoose = require('mongoose');
const { RoundFormats } = require('../helpers/wca');

module.exports = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: RoundFormats.map((format) => format.id)
  },
  timeLimit: {
    centiseconds: {
      type: Number,
      min: 1,
    },
    cumulativeRoundIds: [String]
  },
  cutoff: {
    numberOfAttempts: {
      type: Number,
      min: 0,
      max: 3
    },
    attemptResult: {
      type: Number,
      min: 0
    }
  },
  advancementCondition: {
    type: {
      type: String,
      enum: ['ranking', 'percent', 'attemptResult']
    },
    level: {
      type: 'Mixed',
    }
  },
  opened: {
    type: Boolean,
    default: false
  }
});