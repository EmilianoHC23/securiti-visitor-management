import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nombre de la empresa es requerido'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Ubicación es requerida'],
    trim: true
  },
  qrCode: {
    type: String,
    unique: true,
    sparse: true // Permite múltiples documentos con qrCode null
  },
  settings: {
    autoApprove: {
      type: Boolean,
      default: false
    },
    requirePhoto: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Generar QR code único antes de guardar
companySchema.pre('save', function(next) {
  if (!this.qrCode) {
    // Generar código QR único basado en el nombre y timestamp
    this.qrCode = `QR_${this.name.replace(/\s+/g, '_').toUpperCase()}_${Date.now()}`;
  }
  next();
});

export default mongoose.model('Company', companySchema);