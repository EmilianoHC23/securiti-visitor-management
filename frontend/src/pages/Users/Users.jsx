import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { Table, Button, Modal, Form, Input, Select, notification } from 'antd';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data.data);
    } catch (error) {
      notification.error({ message: 'Error al cargar usuarios' });
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await userService.updateUser(editingUser._id, values);
        notification.success({ message: 'Usuario actualizado' });
      } else {
        await userService.createUser(values);
        notification.success({ message: 'Usuario creado' });
      }
      loadUsers();
      setIsModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      notification.error({ message: 'Error al guardar usuario' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      notification.success({ message: 'Usuario eliminado' });
      loadUsers();
    } catch (error) {
      notification.error({ message: 'Error al eliminar usuario' });
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => {
            setEditingUser(record);
            form.setFieldsValue(record);
            setIsModalVisible(true);
          }}>Editar</Button>
          <Button onClick={() => handleDelete(record._id)} danger>Eliminar</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => {
        setEditingUser(null);
        form.resetFields();
        setIsModalVisible(true);
      }} type="primary" style={{ marginBottom: 16 }}>
        Agregar Usuario
      </Button>
      <Table columns={columns} dataSource={users} rowKey="_id" />
      <Modal
        title={editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          {!editingUser && (
            <Form.Item name="password" label="Contraseña" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item name="role" label="Rol" rules={[{ required: true }]}>
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="security">Seguridad</Option>
              <Option value="reception">Recepción</Option>
              <Option value="employee">Empleado</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
