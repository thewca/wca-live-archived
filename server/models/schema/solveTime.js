const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  centiseconds: {
    type: Number,
    min: -2 // -1 and -2 are used for DNS and DNF
  }
});