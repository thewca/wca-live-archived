const mongoose = require('mongoose');
const { Events } = require('../../lib/wca');

module.exports = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  wcaId: {
    type: String
  },
  countryIso2: {
    type: String
  },
  registration: [{
    type: String,
    enum: Events.map(event => event.id)
  }]
});
