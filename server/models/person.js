const mongoose = require('mongoose');
const PersonalBest = require('./personalBest');

const schema = new mongoose.Schema({
  id: {
    type: Number,
    min: 1,
    required: true,
    index: true,
    unique: true
  },
  wcaId: {
    type: String,
    index: true
  },
  thumbnailUrl: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    minlength: 2,
    maxlength: 2,
    required: true
  },
  gender: {
    type: String,
    enum: ['m', 'f', 'o'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  personalBests: {
    type: [PersonalBest]
  }
});

module.exports = mongoose.model('Person', schema, 'persons');