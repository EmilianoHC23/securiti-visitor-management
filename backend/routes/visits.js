const express = require('express');
const router = express.Router();
const { 
  checkIn, 
  checkOut 
} = require('../controllers/visitController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Todas las rutas aquí están protegidas y solo son accesibles para personal autorizado
router.use(authenticateToken, authorizeRoles('admin', 'security', 'reception'));

router.post('/check-in', checkIn);
router.post('/check-out/:id', checkOut);

module.exports = router;
