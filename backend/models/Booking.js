const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  serviceNames: [{
    type: String,
  }],
  serviceIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }],
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  vehicleMake: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleYear: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Completed', 'Rejected'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);