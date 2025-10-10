import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments } from '../services/appointmentService'; // Asumo que este servicio existe

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>Citas Agendadas</h2>
      <Link to="/appointments/new">Agendar Nueva Cita</Link>
      <table>
        <thead>
          <tr>
            <th>Visitante</th>
            <th>Anfitrión</th>
            <th>Motivo</th>
            <th>Fecha y Hora</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.visitorName}</td>
              <td>{appointment.hostName}</td>
              <td>{appointment.purpose}</td>
              <td>{new Date(appointment.appointmentTime).toLocaleString()}</td>
              <td>{appointment.status}</td>
              <td>
                <Link to={`/appointments/${appointment._id}`}>Ver/Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsPage;
