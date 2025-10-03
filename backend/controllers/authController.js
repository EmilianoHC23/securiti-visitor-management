import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generar token JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'secret_key_for_development',
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Crear nuevo usuario
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role: role || 'host'
    });

    await user.save();

    // Generar token
    const token = generateToken(user._id);

    // Responder sin la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// @desc    Iniciar sesión
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generateToken(user._id);

    // Responder sin la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: 'Inicio de sesión exitoso',
      user: userResponse,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};