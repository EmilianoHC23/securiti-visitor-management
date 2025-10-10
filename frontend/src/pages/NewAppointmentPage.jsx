import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAppointment } from '../services/appointmentService';

const NewAppointmentPage = () => {
  const [formData, setFormData] = useState({
    visitorName: '',
    hostName: '',
    company: '',
    purpose: '',
    appointmentTime: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      navigate('/appointments');
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div>
      <h2>Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Visitante:</label>
          <input
            type="text"
            name="visitorName"
            value={formData.visitorName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre del Anfitrión:</label>
          <input
            type="text"
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Empresa:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Motivo:</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  );
};

export default NewAppointmentPage;
