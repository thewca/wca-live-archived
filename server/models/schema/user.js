const mongoose = require('mongoose');
const Competition = require('./competition');

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  email: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  wca_id: {
    type: String
  },
  delegate_status: {
    type: String,
    required: true
  },
  competitions: [Competition.schema]
});

module.exports = mongoose.model('User', schema, 'users');
