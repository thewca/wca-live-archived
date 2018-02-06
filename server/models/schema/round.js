const mongoose = require('mongoose');
const Result = require('./result');
const { RoundFormats } = require('../../lib/wca');

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
    advancementCondition: {
      type: {
        type: String,
        enum: ['ranking', 'percent', 'attemptResult']
      },
      level: {
        type: 'Mixed',
      }
    }
  },
  results: [Result]
});
