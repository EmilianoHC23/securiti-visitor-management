import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AppointmentsPage from './pages/AppointmentsPage'
import NewAppointmentPage from './pages/NewAppointmentPage'
import AppointmentDetailPage from './pages/AppointmentDetailPage'
import Layout from './components/Layout/Layout'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando sistema...</div>
      </div>
    )
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/appointments"
            element={user ? <AppointmentsPage /> : <Navigate to="/login" />}
          />
          <Route 
            path="/appointments/new"
            element={user ? <NewAppointmentPage /> : <Navigate to="/login" />}
          />
          <Route 
            path="/appointments/:id"
            element={user ? <AppointmentDetailPage /> : <Navigate to="/login" />}
          />
          <Route 
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
