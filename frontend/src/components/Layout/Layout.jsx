import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="layout">
      <Sidebar 
        isOpen={sidebarOpen} 
        userRole={user?.role} 
      />
      
      <div className={`layout-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header 
          onToggleSidebar={toggleSidebar} 
          user={user}
          onLogout={logout}
        />
        
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout