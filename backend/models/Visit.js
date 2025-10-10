import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date },
  securityNotes: { type: String },
}, { timestamps: true });

export default mongoose.model('Visit', visitSchema);
