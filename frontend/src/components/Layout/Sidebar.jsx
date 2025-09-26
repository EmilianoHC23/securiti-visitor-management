import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({ isOpen, userRole }) => {
  // Menú basado en el rol del usuario
  const menuItems = {
    admin: [
      { path: '/dashboard', icon: '📊', label: 'Actividad', exact: true },
      { path: '/users', icon: '👥', label: 'Usuarios' },
      { path: '/companies', icon: '🏢', label: 'Empresas' },
      { path: '/visits', icon: '👤', label: 'Auto-registro' },
      { path: '/accesses', icon: '📅', label: 'Accesos/Eventos' },
      { path: '/blacklist', icon: '🚫', label: 'Lista Negra' },
      { path: '/reports', icon: '📈', label: 'Reportes' },
      { path: '/configuration', icon: '⚙️', label: 'Configuración' }
    ],
    reception: [
      { path: '/dashboard', icon: '📊', label: 'Actividad', exact: true },
      { path: '/accesses', icon: '�', label: 'Accesos/Eventos' },
      { path: '/blacklist', icon: '�', label: 'Lista Negra' }
    ],
    host: [
      { path: '/dashboard', icon: '📊', label: 'Actividad', exact: true },
      { path: '/accesses', icon: '📅', label: 'Accesos/Eventos' }
    ]
  }

  const currentMenu = menuItems[userRole] || menuItems.host

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>SecuriTI</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {currentMenu.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                end={item.exact}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{item.icon}</span>
                {isOpen && <span className="nav-label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar