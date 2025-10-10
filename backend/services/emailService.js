const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo de Gmail
    pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación de Gmail
  },
});

const sendAppointmentNotification = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de notificación de cita enviado con éxito.');
  } catch (error) {
    console.error('Error al enviar el correo de notificación de cita:', error);
  }
};

exports.sendCreationNotification = (appointment) => {
  const subject = `Confirmación de Cita: ${appointment.purpose}`;
  const html = `
    <h1>Confirmación de Cita</h1>
    <p>Hola,</p>
    <p>Tu cita ha sido agendada con los siguientes detalles:</p>
    <ul>
      <li><strong>Visitante:</strong> ${appointment.visitorName}</li>
      <li><strong>Anfitrión:</strong> ${appointment.hostName}</li>
      <li><strong>Empresa:</strong> ${appointment.company}</li>
      <li><strong>Motivo:</strong> ${appointment.purpose}</li>
      <li><strong>Fecha y Hora:</strong> ${new Date(appointment.appointmentTime).toLocaleString()}</li>
      <li><strong>Estado:</strong> ${appointment.status}</li>
    </ul>
    <p>Gracias por usar nuestro sistema de gestión de visitas.</p>
  `;
  const to = [appointment.visitorEmail, appointment.hostEmail].join(',');
  return sendAppointmentNotification(to, subject, html);
};

exports.sendUpdateNotification = (appointment) => {
  const subject = `Actualización de Cita: ${appointment.purpose}`;
  const html = `
    <h1>Actualización de Cita</h1>
    <p>Hola,</p>
    <p>Tu cita ha sido actualizada con los siguientes detalles:</p>
    <ul>
      <li><strong>Visitante:</strong> ${appointment.visitorName}</li>
      <li><strong>Anfitrión:</strong> ${appointment.hostName}</li>
      <li><strong>Empresa:</strong> ${appointment.company}</li>
      <li><strong>Motivo:</strong> ${appointment.purpose}</li>
      <li><strong>Fecha y Hora:</strong> ${new Date(appointment.appointmentTime).toLocaleString()}</li>
      <li><strong>Estado:</strong> ${appointment.status}</li>
    </ul>
    <p>Gracias por usar nuestro sistema de gestión de visitas.</p>
  `;
  const to = [appointment.visitorEmail, appointment.hostEmail].join(',');
  return sendAppointmentNotification(to, subject, html);
};

exports.sendCancellationNotification = (appointment) => {
  const subject = `Cancelación de Cita: ${appointment.purpose}`;
  const html = `
    <h1>Cancelación de Cita</h1>
    <p>Hola,</p>
    <p>Tu cita ha sido cancelada. Los detalles de la cita eran:</p>
    <ul>
      <li><strong>Visitante:</strong> ${appointment.visitorName}</li>
      <li><strong>Anfitrión:</strong> ${appointment.hostName}</li>
      <li><strong>Empresa:</strong> ${appointment.company}</li>
      <li><strong>Motivo:</strong> ${appointment.purpose}</li>
      <li><strong>Fecha y Hora:</strong> ${new Date(appointment.appointmentTime).toLocaleString()}</li>
    </ul>
    <p>Gracias por usar nuestro sistema de gestión de visitas.</p>
  `;
  const to = [appointment.visitorEmail, appointment.hostEmail].join(',');
  return sendAppointmentNotification(to, subject, html);
};
