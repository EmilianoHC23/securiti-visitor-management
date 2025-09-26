import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  visitorName: {
    type: String,
    required: [true, 'Nombre del visitante es requerido'],
    trim: true
  },
  visitorEmail: {
    type: String,
    lowercase: true,
    trim: true
  },
  visitorCompany: {
    type: String,
    trim: true
  },
  visitorPhoto: {
    type: String // URL o path de la foto opcional
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Anfitrión es requerido']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Empresa es requerida']
  },
  reason: {
    type: String,
    required: [true, 'Motivo de la visita es requerido'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'checked-in', 'completed'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date // Para visitas pre-registradas
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  duration: {
    type: Number // En minutos
  },
  accessCode: {
    type: String // Para pre-registros
  }
}, {
  timestamps: true
});

// Índices para mejorar consultas
visitSchema.index({ scheduledDate: 1, status: 1 });
visitSchema.index({ hostEmployee: 1 });
visitSchema.index({ createdBy: 1 });

// Método virtual para obtener duración real de la visita
visitSchema.virtual('actualDuration').get(function() {
  if (this.checkInTime && this.checkOutTime) {
    return Math.round((this.checkOutTime - this.checkInTime) / (1000 * 60)); // en minutos
  }
  return null;
});

export default mongoose.model('Visit', visitSchema);