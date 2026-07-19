import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const SignupPage: React.FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState<'faculty' | 'hod'>('faculty')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      return alert('Please enter your College ID and password.')
    }
    if (password !== confirmPassword) {
      return alert('Passwords do not match.')
    }

    auth.login(role, username)
    navigate(role === 'faculty' ? '/faculty/dashboard' : '/hod/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-slate-900 p-10 text-white">
            <div className="mb-8">
              <img src="/logo-srm.svg" alt="SRM Logo" className="h-16 w-auto" />
            </div>
            <h1 className="text-3xl font-semibold">Create your account</h1>
            <p className="mt-4 text-slate-300">Sign up for access as Faculty or HOD to continue to the dashboard.</p>
          </div>
          <div className="p-10">
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Sign up as</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-pressed={role === 'faculty'}
                    onClick={() => setRole('faculty')}
                    className={
                      `flex-1 text-sm font-medium py-2 px-4 rounded-full transition-colors duration-150 focus:outline-none ` +
                      (role === 'faculty'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100')
                    }
                  >
                    Faculty
                  </button>
                  <button
                    type="button"
                    aria-pressed={role === 'hod'}
                    onClick={() => setRole('hod')}
                    className={
                      `flex-1 text-sm font-medium py-2 px-4 rounded-full transition-colors duration-150 focus:outline-none ` +
                      (role === 'hod'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100')
                    }
                  >
                    HOD
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">NetID</label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                  placeholder="sv7491"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                  placeholder="Enter password"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                  placeholder="Re-enter password"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-white text-sm font-semibold shadow hover:bg-slate-800"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-6 text-sm text-slate-500">
              Already registered?{' '}
              <Link to="/login" className="font-medium text-slate-900 hover:underline">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
