const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    default: 'Wrench',
  },
  longDescription: {
    type: String,
    required: true,
  },
  included: [{
    type: String,
  }],
  benefits: [{
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);