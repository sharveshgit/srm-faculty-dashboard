import React, { useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { initializeSeedData } from './utils/storage'
import LoginPage from './pages/Auth/Login'
import SignupPage from './pages/Auth/Signup'
import ForgotPassword from './pages/Auth/ForgotPassword'
import HomePage from './pages/HomePage'
import FacultyDashboard from './pages/Faculty/Dashboard'
import TasksPage from './pages/Faculty/Tasks'
import HODDashboard from './pages/HOD/Dashboard'
import HODFaculty from './pages/HOD/Faculty'
import EventsPage from './pages/Faculty/Events'
import TopicsPage from './pages/Faculty/Topics'
import ReportsPage from './pages/Reports'
import SettingsPage from './pages/Settings'
import ImportData from './pages/Admin/ImportData'
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'

const ProtectedRoute: React.FC<{role?: 'faculty' | 'hod', children: React.ReactNode}> = ({role, children}) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (role && auth.user.role !== role) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

const App: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  React.useEffect(()=>{
    initializeSeedData()
  },[])

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex">
              <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
              <div className="flex-1">
                <Topbar onMenuClick={() => setMobileNavOpen(true)} />
                <main className="p-6">
                  <Routes>
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="faculty/dashboard" element={<ProtectedRoute role="faculty"><FacultyDashboard /></ProtectedRoute>} />
                    <Route path="faculty/tasks" element={<ProtectedRoute role="faculty"><TasksPage /></ProtectedRoute>} />
                    <Route path="faculty/events" element={<ProtectedRoute role="faculty"><EventsPage /></ProtectedRoute>} />
                    <Route path="faculty/topics" element={<ProtectedRoute role="faculty"><TopicsPage /></ProtectedRoute>} />
                    <Route path="reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
                    <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    <Route path="import" element={<ProtectedRoute><ImportData /></ProtectedRoute>} />
                    <Route path="hod/dashboard" element={<ProtectedRoute role="hod"><HODDashboard /></ProtectedRoute>} />
                    <Route path="hod/faculty" element={<ProtectedRoute role="hod"><HODFaculty /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
