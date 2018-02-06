const mongoose = require('mongoose');
const { Events } = require('../../lib/wca');

module.exports = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  wcaId: {
    type: String
  },
  countryIso2: {
    type: String,
    required: true
  },
  delegatesCompetition: Boolean,
  organizesCompetition: Boolean,
  registration: {
    status: String,
    eventIds: [{
      type: String,
      enum: Events.map((event) => event.id)
    }]
  }
});
