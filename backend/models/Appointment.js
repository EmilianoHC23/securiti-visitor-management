import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  visitorName: { type: String, required: true },
  visitorEmail: { type: String, required: true },
  visitorPhone: { type: String },
  visitorCompany: { type: String },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purpose: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Checked-in', 'Checked-out'],
    default: 'Pending',
  },
  qrCode: { type: String }, // URL or data for the QR code
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
