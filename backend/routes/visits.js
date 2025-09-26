import express from 'express';
import Visit from '../models/Visit.js';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/visits - Obtener visitas
router.get('/', async (req, res) => {
  try {
    const { status, date, hostEmployee, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Filtros basados en rol
    if (req.user.role === 'employee') {
      // Los empleados solo ven visitas donde son anfitriones
      filter.hostEmployee = req.user._id;
    }

    // Aplicar filtros adicionales
    if (status) filter.status = status;
    if (hostEmployee && (req.user.role === 'admin' || req.user.role === 'security')) {
      filter.hostEmployee = hostEmployee;
    }
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.scheduledDate = { $gte: startDate, $lt: endDate };
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const visits = await Visit.find(filter)
      .populate('hostEmployee', 'name email department')
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ scheduledDate: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Visit.countDocuments(filter);

    res.json({
      visits,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + visits.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error obteniendo visitas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// POST /api/visits - Crear nueva visita
router.post('/', async (req, res) => {
  try {
    const {
      visitorName,
      visitorEmail,
      visitorPhone,
      visitorCompany,
      hostEmployee,
      purpose,
      scheduledDate,
      scheduledTime,
      expectedDuration
    } = req.body;

    // Verificar que el empleado anfitrión existe y está activo
    const host = await User.findOne({ 
      _id: hostEmployee, 
      role: 'employee', 
      isActive: true 
    });

    if (!host) {
      return res.status(400).json({ message: 'Empleado anfitrión no válido' });
    }

    // Crear la visita
    const visit = new Visit({
      visitorName,
      visitorEmail,
      visitorPhone,
      visitorCompany,
      hostEmployee,
      purpose,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      expectedDuration: expectedDuration || 60,
      createdBy: req.user._id
    });

    await visit.save();

    // Poblar la información antes de responder
    await visit.populate('hostEmployee', 'name email department');
    await visit.populate('createdBy', 'name email');

    res.status(201).json({
      message: 'Visita creada exitosamente',
      visit
    });
  } catch (error) {
    console.error('Error creando visita:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/visits/:id - Obtener visita específica
router.get('/:id', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate('hostEmployee', 'name email department')
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email');

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    // Verificar permisos
    const canView = 
      req.user.role === 'admin' || 
      req.user.role === 'security' ||
      visit.hostEmployee._id.toString() === req.user._id.toString() ||
      visit.createdBy._id.toString() === req.user._id.toString();

    if (!canView) {
      return res.status(403).json({ message: 'No tienes permisos para ver esta visita' });
    }

    res.json({ visit });
  } catch (error) {
    console.error('Error obteniendo visita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/visits/:id - Actualizar visita
router.put('/:id', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    // Solo el creador o admin pueden editar, y solo si está pendiente
    const canEdit = 
      (req.user.role === 'admin') ||
      (visit.createdBy.toString() === req.user._id.toString() && visit.status === 'pending');

    if (!canEdit) {
      return res.status(403).json({ message: 'No puedes editar esta visita' });
    }

    const updateData = req.body;
    
    // No permitir cambio de estado por esta ruta
    delete updateData.status;
    delete updateData.checkInTime;
    delete updateData.checkOutTime;

    const updatedVisit = await Visit.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('hostEmployee', 'name email department')
      .populate('createdBy', 'name email');

    res.json({
      message: 'Visita actualizada exitosamente',
      visit: updatedVisit
    });
  } catch (error) {
    console.error('Error actualizando visita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/visits/:id/approve - Aprobar visita (admin y security)
router.put('/:id/approve', authorizeRoles('admin', 'security'), async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    if (visit.status !== 'pending') {
      return res.status(400).json({ message: 'Solo se pueden aprobar visitas pendientes' });
    }

    visit.status = 'approved';
    visit.approvedBy = req.user._id;
    await visit.save();

    await visit.populate('hostEmployee', 'name email department');
    await visit.populate('approvedBy', 'name email');

    res.json({
      message: 'Visita aprobada exitosamente',
      visit
    });
  } catch (error) {
    console.error('Error aprobando visita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/visits/:id/reject - Rechazar visita (admin y security)
router.put('/:id/reject', authorizeRoles('admin', 'security'), async (req, res) => {
  try {
    const { rejectedReason } = req.body;

    if (!rejectedReason) {
      return res.status(400).json({ message: 'Razón del rechazo es requerida' });
    }

    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    if (visit.status !== 'pending') {
      return res.status(400).json({ message: 'Solo se pueden rechazar visitas pendientes' });
    }

    visit.status = 'rejected';
    visit.rejectedReason = rejectedReason;
    visit.approvedBy = req.user._id;
    await visit.save();

    await visit.populate('hostEmployee', 'name email department');
    await visit.populate('approvedBy', 'name email');

    res.json({
      message: 'Visita rechazada exitosamente',
      visit
    });
  } catch (error) {
    console.error('Error rechazando visita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/visits/:id/checkin - Check-in de visita (security)
router.put('/:id/checkin', authorizeRoles('security'), async (req, res) => {
  try {
    const { securityNotes } = req.body;

    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    if (visit.status !== 'approved') {
      return res.status(400).json({ message: 'Solo se puede hacer check-in a visitas aprobadas' });
    }

    visit.status = 'checked-in';
    visit.checkInTime = new Date();
    if (securityNotes) visit.securityNotes = securityNotes;
    
    await visit.save();
    await visit.populate('hostEmployee', 'name email department');

    res.json({
      message: 'Check-in realizado exitosamente',
      visit
    });
  } catch (error) {
    console.error('Error en check-in:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/visits/:id/checkout - Check-out de visita (security)
router.put('/:id/checkout', authorizeRoles('security'), async (req, res) => {
  try {
    const { securityNotes } = req.body;

    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    if (visit.status !== 'checked-in') {
      return res.status(400).json({ message: 'Solo se puede hacer check-out a visitas con check-in' });
    }

    visit.status = 'checked-out';
    visit.checkOutTime = new Date();
    if (securityNotes) {
      visit.securityNotes = visit.securityNotes 
        ? `${visit.securityNotes}\n---\n${securityNotes}`
        : securityNotes;
    }
    
    await visit.save();
    await visit.populate('hostEmployee', 'name email department');

    res.json({
      message: 'Check-out realizado exitosamente',
      visit
    });
  } catch (error) {
    console.error('Error en check-out:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/visits/:id - Cancelar/eliminar visita
router.delete('/:id', async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visita no encontrada' });
    }

    // Solo el creador, admin, o security pueden cancelar
    const canDelete = 
      req.user.role === 'admin' || 
      req.user.role === 'security' ||
      visit.createdBy.toString() === req.user._id.toString();

    if (!canDelete) {
      return res.status(403).json({ message: 'No tienes permisos para cancelar esta visita' });
    }

    // No se puede eliminar visitas con check-in
    if (visit.status === 'checked-in') {
      return res.status(400).json({ message: 'No se puede cancelar una visita con check-in activo' });
    }

    await Visit.findByIdAndDelete(req.params.id);

    res.json({ message: 'Visita cancelada exitosamente' });
  } catch (error) {
    console.error('Error cancelando visita:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;