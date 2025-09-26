import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
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
  reason: {
    type: String,
    required: [true, 'Razón para incluir en lista negra es requerida'],
    trim: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuario que agregó a la lista es requerido']
  }
}, {
  timestamps: true
});

// Índices para optimización
blacklistSchema.index({ visitorName: 1 });
blacklistSchema.index({ visitorEmail: 1 });

export default mongoose.model('Blacklist', blacklistSchema);