import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'

type SidebarProps = {
  open?: boolean
  onClose?: () => void
}

type MenuItem = {
  to: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const SIDEBAR_COLLAPSED_KEY = 'faculty-hod-sidebar-collapsed'

const Sidebar: React.FC<SidebarProps> = ({ open = false, onClose }) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
    setCollapsed(stored === 'true')
  }, [])

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next))
  }

  const onLogout = () => {
    auth.logout()
    navigate('/login')
  }

  const menuItems: MenuItem[] = auth.user?.role === 'hod' ? [
    { to: '/hod/dashboard', label: 'HOD Dashboard', icon: HomeIcon },
    { to: '/hod/faculty', label: 'Faculty Monitor', icon: UserGroupIcon },
    { to: '/import', label: 'Import Data', icon: ArrowUpTrayIcon },
  ] : [
    { to: '/faculty/dashboard', label: 'Dashboard', icon: HomeIcon },
    { to: '/faculty/topics', label: 'Faculty', icon: UserGroupIcon },
    { to: '/faculty/tasks', label: 'Assign Task', icon: ClipboardDocumentCheckIcon },
    { to: '/faculty/events', label: 'Analysis', icon: ChartBarIcon },
    { to: '/reports', label: 'Reports', icon: DocumentTextIcon },
    { to: '/settings', label: 'Settings', icon: Cog6ToothIcon },
  ]

  return (
    <>
      <aside className={`${collapsed ? 'w-24' : 'w-72'} bg-gradient-to-b from-slate-50 to-slate-100 border-r border-slate-200 hidden md:flex flex-col justify-between overflow-hidden transition-all duration-300`}>
        <div>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-4 p-6`}>
            <div className={`flex items-center gap-4 ${collapsed ? 'justify-center w-full' : ''}`}>
              <div className="h-12 w-12 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0" />
              <div className={`${collapsed ? 'hidden' : 'block'}`}>
                <div className="font-bold text-slate-900 text-base">SRM Faculty</div>
                <div className="text-xs text-slate-500 font-medium">Work Management</div>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleCollapsed}
              className="hidden rounded-full border border-slate-300 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50 md:inline-flex flex-shrink-0"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronDoubleRightIcon className="h-4 w-4" /> : <ChevronDoubleLeftIcon className="h-4 w-4" />}
            </button>
          </div>

          <div className={`px-2 py-4 ${collapsed ? 'space-y-2' : 'space-y-1'}`}>
            <div className={`px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700 ${collapsed ? 'hidden' : 'block'}`}>
              Navigation
            </div>
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  className={({ isActive }) => `group flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-blue-100 text-blue-900 shadow-sm' : 'text-slate-700 hover:bg-slate-200'}`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className={`${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
          {auth.user ? (
            <button
              onClick={onLogout}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
            >
              <span className={`${collapsed ? 'hidden' : 'inline'}`}>Logout</span>
              <span className={`${collapsed ? 'inline' : 'hidden'}`} title="Logout">⏻</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="block rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </aside>

      <div className={`fixed inset-0 z-40 md:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-slate-900/60" onClick={onClose} />
        <aside className="relative z-50 h-full w-72 bg-gradient-to-b from-slate-50 to-slate-100 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-900" />
              <div>
                <div className="font-bold text-slate-900">SRM Faculty</div>
                <div className="text-xs text-slate-500">Work Management</div>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
              ✕
            </button>
          </div>
          <nav className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-900' : 'text-slate-700 hover:bg-slate-200'}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
          <div className="mt-8">
            {auth.user ? (
              <button
                onClick={() => {
                  onLogout()
                  onClose?.()
                }}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={onClose} className="block rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-200">
                Login
              </Link>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}

export default Sidebar
