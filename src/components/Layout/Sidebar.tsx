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
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r hidden md:flex flex-col justify-between overflow-hidden transition-all duration-300`}>
        <div>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3 p-6`}>
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
              <div className="h-10 w-10 rounded-full bg-university-500" />
              <div className={`${collapsed ? 'hidden' : 'block'}`}>
                <div className="font-bold">SRM Faculty</div>
                <div className="text-xs text-gray-500">Work Management</div>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleCollapsed}
              className="hidden rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-200 dark:hover:bg-gray-700 md:inline-flex"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronDoubleRightIcon className="h-4 w-4" /> : <ChevronDoubleLeftIcon className="h-4 w-4" />}
            </button>
          </div>

          <div className={`px-4 py-2 ${collapsed ? 'space-y-2' : 'space-y-1'}`}>
            <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 ${collapsed ? 'hidden' : 'block'}`}>
              Navigation
            </div>
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={item.label}
                  className={({ isActive }) => `group flex items-center gap-3 rounded px-3 py-2 text-sm transition ${isActive ? 'bg-university-50 text-slate-900 dark:bg-gray-700 dark:text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-700'}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className={`${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                </NavLink>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-gray-700">
          {auth.user ? (
            <button
              onClick={onLogout}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-700"
            >
              <span className={`${collapsed ? 'hidden' : 'inline'}`}>Logout</span>
              <span className={`${collapsed ? 'inline' : 'hidden'}`} title="Logout">⏻</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="block rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-700 hover:bg-slate-100 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-700"
            >
              Login
            </Link>
          )}
        </div>
      </aside>

      <div className={`fixed inset-0 z-40 md:hidden ${open ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-slate-900/60" onClick={onClose} />
        <aside className="relative z-50 h-full w-72 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="font-bold">SRM Faculty</div>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-900">
              Close
            </button>
          </div>
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `flex items-center gap-3 rounded px-3 py-2 text-sm ${isActive ? 'bg-university-50 text-slate-900' : 'text-slate-700 hover:bg-slate-100'}`}
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
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={onClose} className="block rounded-md border border-slate-300 px-3 py-2 text-center text-sm text-slate-700 hover:bg-slate-100">
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
