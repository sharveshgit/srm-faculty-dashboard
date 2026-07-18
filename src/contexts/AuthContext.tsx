import React, { createContext, useContext, useState } from 'react'

type User = { id: string; name: string; role: 'faculty' | 'hod'; email?: string }

type AuthContextType = {
  user: User | null
  login: (role: 'faculty' | 'hod', username: string) => void
  logout: () => void
}

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem('fh_user')
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser())

  const login = (role: 'faculty' | 'hod', username: string) => {
    const u: User = { id: username, name: username, role }
    setUser(u)
    localStorage.setItem('fh_user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('fh_user')
  }

  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
