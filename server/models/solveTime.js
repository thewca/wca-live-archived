const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  centiseconds: {
    type: Number,
    min: -2 // -2 and -1 are used for DNS and DNF
  }
});