import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById, updateAppointment, deleteAppointment } from '../services/appointmentService';

const AppointmentDetailPage = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const data = await getAppointmentById(id);
        setAppointment(data);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateAppointment(id, appointment);
      navigate('/appointments');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(id);
      navigate('/appointments');
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  if (!appointment) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Detalles de la Cita</h2>
      <form>
        <div>
          <label>Nombre del Visitante:</label>
          <input
            type="text"
            name="visitorName"
            value={appointment.visitorName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nombre del Anfitrión:</label>
          <input
            type="text"
            name="hostName"
            value={appointment.hostName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Empresa:</label>
          <input
            type="text"
            name="company"
            value={appointment.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Motivo:</label>
          <input
            type="text"
            name="purpose"
            value={appointment.purpose}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha y Hora:</label>
          <input
            type="datetime-local"
            name="appointmentTime"
            value={new Date(appointment.appointmentTime).toISOString().slice(0, 16)}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estado:</label>
          <select name="status" value={appointment.status} onChange={handleChange}>
            <option value="scheduled">Agendada</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
      </form>
      <button onClick={handleUpdate}>Actualizar Cita</button>
      <button onClick={handleDelete}>Eliminar Cita</button>
    </div>
  );
};

export default AppointmentDetailPage;
