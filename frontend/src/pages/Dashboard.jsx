import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  const getWelcomeMessage = () => {
    const roleMessages = {
      admin: 'Panel de Administración',
      reception: 'Control de Recepción', 
      host: 'Gestión de Visitas'
    }
    return roleMessages[user.role] || 'Bienvenido a SecuriTI'
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{getWelcomeMessage()}</h1>
        <p>Hola, {user.firstName} {user.lastName}</p>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>¡Bienvenido!</h2>
          <p>Entraste como: <strong>{user.role}</strong></p>
        </div>

        <div className="quick-stats">
          <div className="stat-card">
            <h3>Total de Visitas Hoy</h3>
            <div className="stat-number">0</div>
          </div>
          
          <div className="stat-card">
            <h3>En Espera</h3>
            <div className="stat-number">0</div>
          </div>
          
          <div className="stat-card">
            <h3>En las Instalaciones</h3>
            <div className="stat-number">0</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard