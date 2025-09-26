import express from 'express';
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/users - Obtener todos los usuarios (solo admin y security)
router.get('/', authorizeRoles('admin', 'reception'), async (req, res) => {
  try {
    const { role, department, isActive } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (department) filter.department = department;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const users = await User.find(filter)
      .select('-password')
      .sort({ name: 1 });

    res.json({
      users,
      count: users.length
    });
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/users/hosts - Obtener solo hosts (para seleccionar anfitriones)
router.get('/hosts', async (req, res) => {
  try {
    const hosts = await User.find({ 
      role: 'host',
      isActive: true,
      isVisibleInAutoRegister: true
    })
      .select('_id firstName lastName email company')
      .populate('company', 'name')
      .sort({ firstName: 1 });

    res.json({ hosts });
  } catch (error) {
    console.error('Error obteniendo hosts:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// GET /api/users/:id - Obtener usuario específico
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Los usuarios solo pueden ver su propia información, excepto admin y security
    if (req.user.role !== 'admin' && req.user.role !== 'security' && req.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permisos para ver este usuario' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/users/:id - Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Los usuarios solo pueden actualizar su propia información, excepto admin
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'No tienes permisos para actualizar este usuario' });
    }

    // No permitir cambio de rol excepto para admin
    if (req.user.role !== 'admin' && updateData.role) {
      delete updateData.role;
    }

    // No permitir actualización del campo password por esta ruta
    delete updateData.password;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario actualizado exitosamente',
      user
    });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// DELETE /api/users/:id - Desactivar usuario (solo admin)
router.delete('/:id', authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario desactivado exitosamente',
      user
    });
  } catch (error) {
    console.error('Error desactivando usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// PUT /api/users/:id/activate - Activar usuario (solo admin)
router.put('/:id/activate', authorizeRoles('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario activado exitosamente',
      user
    });
  } catch (error) {
    console.error('Error activando usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;