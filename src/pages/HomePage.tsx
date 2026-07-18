import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { useAuth } from '../contexts/AuthContext'

const features = [
  {
    title: 'Faculty workflow',
    description: 'Track tasks, projects, and deadlines in one streamlined workspace.'
  },
  {
    title: 'HOD visibility',
    description: 'Keep department-level oversight clear with shared summaries and status views.'
  },
  {
    title: 'Fast reporting',
    description: 'Export project data and share updates without extra friction.'
  }
]

const HomePage: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div className="flex items-center gap-4">
            <img src="/logo-srm.svg" alt="SRM Ramapuram Logo" className="h-14 w-auto" />
            <div className="space-y-1">
              <div className="text-xl font-semibold">SRM Faculty Portal</div>
              <div className="text-sm text-slate-400">SRM Institute of Science & Technology</div>
            </div>
          </div>
        <nav className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-300 hover:text-white">
            {user ? 'Open app' : 'Sign in'}
          </Link>
          <Link to={user ? '/faculty/dashboard' : '/login'}>
            <Button variant="primary">{user ? 'Open dashboard' : 'Start here'}</Button>
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-16 lg:px-8">
        <section className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur md:grid-cols-[1.15fr_0.85fr] md:p-12">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-sm text-sky-200">
              Quick admin and faculty operations
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                A simple website for managing faculty work and HOD oversight.
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Keep tasks, deadlines, project progress, and department updates in one clean workspace that is ready to use.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={user ? '/faculty/dashboard' : '/login'}>
                <Button variant="primary">{user ? 'Go to dashboard' : 'Sign in to continue'}</Button>
              </Link>
              <Link to={user ? '/hod/dashboard' : '/login'}>
                <Button variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                  {user ? 'View HOD view' : 'Access after sign in'}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="bg-slate-900/70 text-white">
              <div className="text-sm text-slate-400">Today</div>
              <div className="mt-2 text-3xl font-semibold">18 tasks</div>
              <div className="mt-2 text-sm text-slate-300">4 due soon • 2 completed</div>
            </Card>
            <Card className="bg-slate-900/70 text-white">
              <div className="text-sm text-slate-400">Projects</div>
              <div className="mt-2 text-3xl font-semibold">6 active</div>
              <div className="mt-2 text-sm text-slate-300">3 ready for review</div>
            </Card>
          </div>
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl md:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-sm text-slate-200">
              SRM Faculty Portal Header
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-white">Dear Faculty,</h2>
              <p className="text-slate-300">Welcome to the SRMIST Faculty Portal.</p>
              <p className="text-slate-300">You can access the portal to know your academic and financial details.</p>
              <p className="text-slate-300">Login using your NetID credentials.</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img src="/logo-srm.svg" alt="SRM Ramapuram Logo" className="h-48 w-auto" />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-slate-900/70 text-white">
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </Card>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-100 shadow-2xl">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-3xl font-semibold">Permanent data store</h2>
            <p className="text-base leading-7 text-slate-300">
              FacultyHub maintains a permanent store of academic information so faculty and HODs can always access the latest tasks, events, project progress, and department updates.
            </p>
            <p className="text-base leading-7 text-slate-300">
              The site saves important data like question paper submissions, attendance updates, internal marks uploads, and research milestones in a consistent record that stays available every time you open the application.
            </p>
            <p className="text-base leading-7 text-slate-300">
              Use the dashboard to review stored tasks, view active events, manage faculty topics, and keep department-level data organized and easy to retrieve.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-400">
        Built for quick collaboration and clear progress tracking.
      </footer>
    </div>
  )
}

export default HomePage
