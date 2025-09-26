import React from 'react'
import './Header.css'

const Header = ({ onToggleSidebar, user, onLogout }) => {
  const getRoleName = (role) => {
    const roles = {
      admin: 'Administrador',
      reception: 'Recepción',
      host: 'Anfitrión'
    }
    return roles[role] || role
  }

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1>SecuriTI</h1>
      </div>
      
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="user-role">{getRoleName(user?.role)}</span>
        </div>
        
        <button 
          className="logout-button"
          onClick={onLogout}
          title="Cerrar sesión"
        >
          🚪
        </button>
      </div>
    </header>
  )
}

export default Header