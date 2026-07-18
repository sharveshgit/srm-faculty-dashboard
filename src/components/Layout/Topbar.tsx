import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

type TopbarProps = {
  onMenuClick?: () => void
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>
        <div className="text-lg font-semibold">Faculty & HOD Dashboard</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">🔔</button>
        <div className="text-sm">
          {auth.user ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-300" />
              <div>{auth.user.name}</div>
              <button onClick={handleLogout} className="ml-2 text-xs text-red-500">Logout</button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default Topbar
