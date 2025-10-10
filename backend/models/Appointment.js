const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  purpose: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  qrCode: {
    type: String,
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
