import api from './api'; // Asumiendo que tienes un cliente de API configurado

const API_URL = '/visits';

// Check-in de un visitante
const checkIn = (appointmentId) => {
  return api.post(`${API_URL}/check-in`, { appointmentId });
};

// Check-out de un visitante
const checkOut = (appointmentId) => {
  return api.post(`${API_URL}/check-out/${appointmentId}`);
};

const visitService = {
  checkIn,
  checkOut,
};

export default visitService;
