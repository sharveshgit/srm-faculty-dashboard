import React, { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const generateCaptcha = () => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

const LoginPage: React.FC = () => {
  const auth = useAuth()
  const nav = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState<'faculty' | 'hod'>('faculty')
  const [username, setUsername] = useState('sv7491')
  const [password, setPassword] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captcha, setCaptcha] = useState<string>(() => generateCaptcha())

  const resetCaptcha = () => setCaptcha(generateCaptcha())

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) return alert('Please enter both your College ID and password.')
    if (!captchaInput) return alert('Please enter the captcha code.')
    if (captchaInput.toUpperCase() !== captcha) {
      alert('Captcha does not match. Please try again.')
      resetCaptcha()
      setCaptchaInput('')
      return
    }

    const state = location.state as { from?: { pathname?: string } } | undefined
    const fromPath = state?.from?.pathname || (role === 'faculty' ? '/faculty/dashboard' : '/hod/dashboard')

    auth.login(role, username)
    nav(fromPath, { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_0.4fr]">
          <div className="bg-slate-50 p-10 lg:p-14">
            <div className="mb-8 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img src="/logo-srm.svg" alt="SRM Logo" className="h-16 w-auto" />
                  <div className="space-y-1">
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      SRM Ramapuram
                    </div>
                    <div>
                      <h1 className="text-3xl font-semibold">SRM Faculty Portal</h1>
                      <p className="text-sm text-slate-500">SRM Institute of Science & Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-xl font-semibold">{role === 'faculty' ? 'Dear Faculty,' : 'Dear HOD,'}</p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Welcome to the SRMIST {role === 'faculty' ? 'Faculty' : 'HOD'} Portal.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Use this portal to access your academic and departmental details, manage tasks, events, and updates.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Login using your NetID credentials to continue.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 lg:p-14">
            <div className="mb-8">
              <div className="rounded-xl bg-slate-900 px-4 py-3 text-white text-lg font-semibold">SRM Faculty Portal</div>
            </div>
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Login as</label>
                <div className="flex items-center gap-2 w-full">
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
                <label className="block text-sm font-medium text-slate-700">NetID (without '@srmist.edu.in')</label>
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

              <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr] items-end">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Captcha</label>
                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="rounded-md bg-slate-900 px-3 py-2 text-white font-semibold tracking-widest">
                      {captcha}
                    </div>
                    <input
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value)}
                      className="w-full bg-transparent outline-none"
                      placeholder="Enter code"
                    />
                    <button type="button" onClick={resetCaptcha} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                      Refresh
                    </button>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <Link to="/forgot-password" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-5 py-3 text-white text-sm font-semibold shadow hover:bg-slate-800"
              >
                Login
              </button>
            </form>
            <div className="mt-6 text-sm text-slate-500">Demo login works with any non-empty password.</div>
            <div className="mt-4 text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-slate-900 hover:underline">
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
