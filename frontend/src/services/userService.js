import api from './api'; // Asumiendo que tienes un cliente de API configurado

const API_URL = '/users';

// Obtener todos los usuarios
const getUsers = () => {
  return api.get(API_URL);
};

// Obtener un solo usuario por ID
const getUser = (id) => {
  return api.get(`${API_URL}/${id}`);
};

// Crear un nuevo usuario
const createUser = (userData) => {
  return api.post(API_URL, userData);
};

// Actualizar un usuario
const updateUser = (id, userData) => {
  return api.put(`${API_URL}/${id}`, userData);
};

// Eliminar un usuario
const deleteUser = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

const userService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
