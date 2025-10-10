import axios from 'axios';

const API_URL = '/api/appointments'; // Asumo que el proxy de desarrollo está configurado

export const getAppointments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching appointment with id ${id}:`, error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData);
    return response.data.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, appointmentData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating appointment with id ${id}:`, error);
    throw error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error deleting appointment with id ${id}:`, error);
    throw error;
  }
};
