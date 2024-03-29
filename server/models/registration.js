const mongoose = require('mongoose');
const { Events } = require('../helpers/wca');

const schema = new mongoose.Schema({
  competitionId: {
    type: String,
    required: true,
    index: true
  },
  personId: {
    type: Number,
    required: true,
    index: true
  },
  registrantId: {
    type: Number,
    required: true,
    index: true
  },
  events: [{
    type: String,
    required: true,
    enum: Events.map((event) => event.id)
  }]
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

schema.virtual('competitor', {
  ref: 'Person',
  localField: 'personId',
  foreignField: 'id',
  justOne: true
})

module.exports = mongoose.model('Registration', schema, 'registrations');