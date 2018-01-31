const mongoose = require('mongoose');
const Round = require('./round');
const { Events } = require('../../lib/wca');

module.exports = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    enum: Events.map(event => event.id)
  },
  rounds: [Round]
});
