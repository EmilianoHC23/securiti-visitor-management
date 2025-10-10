const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Todas las rutas aquí están protegidas y solo son accesibles para administradores
router.use(authenticateToken, authorizeRoles('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
