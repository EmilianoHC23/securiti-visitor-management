import React, { useState, useEffect } from 'react';
import * as appointmentService from '../../services/appointmentService';
import visitService from '../../services/visitService';
import { Table, Button, notification, Tag } from 'antd';

const Checkin = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await appointmentService.getAppointments({ status: 'Approved' });
      setAppointments(response.data.data);
    } catch (error) {
      notification.error({ message: 'Error al cargar citas' });
    }
  };

  const handleCheckIn = async (id) => {
    try {
      await visitService.checkIn(id);
      notification.success({ message: 'Check-in realizado' });
      loadAppointments();
    } catch (error) {
      notification.error({ message: 'Error en el check-in' });
    }
  };

  const handleCheckOut = async (id) => {
    try {
      await visitService.checkOut(id);
      notification.success({ message: 'Check-out realizado' });
      loadAppointments();
    } catch (error) {
      notification.error({ message: 'Error en el check-out' });
    }
  };

  const columns = [
    { title: 'Visitante', dataIndex: 'visitorName', key: 'visitorName' },
    { title: 'Empresa', dataIndex: 'visitorCompany', key: 'visitorCompany' },
    { title: 'Anfitrión', dataIndex: ['host', 'name'], key: 'host' },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status === 'Checked-in' ? 'green' : 'blue'}>{status}</Tag>,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          {record.status === 'Approved' && (
            <Button onClick={() => handleCheckIn(record._id)} type="primary">
              Check-in
            </Button>
          )}
          {record.status === 'Checked-in' && (
            <Button onClick={() => handleCheckOut(record._id)} type="primary" danger>
              Check-out
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={appointments} rowKey="_id" />
    </div>
  );
};

export default Checkin;
