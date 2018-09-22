const mongoose = require('mongoose');
const SolveTime = require('./solveTime');

module.exports = new mongoose.Schema({
  personId: {
    type: String
  },
  position: {
    type: Number,
    min: 0
  },
  solves: {
    type: [SolveTime],
  },
  average: {
    type: SolveTime
  }
});
