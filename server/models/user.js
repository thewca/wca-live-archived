const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: Number
  },
  email: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  wca_id: {
    type: String
  },
});

module.exports = mongoose.model('User', schema, 'users');
