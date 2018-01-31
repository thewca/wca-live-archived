const mongoose = require('mongoose');

const SolveTime = new mongoose.Schema({
  centiseconds: {
    type: Number,
    min: 0
  }
});

module.exports = new mongoose.Schema({
  personId: {
    type: String
  },
  position: {
    type: Number,
    min: 0
  },
  average: {
    type: SolveTime
  }
});
