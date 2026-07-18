import React from 'react'
import Card from '../components/ui/Card'

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">Configure your account preferences, notifications, and portal behavior.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="mt-2 text-sm text-slate-500">Update your profile, email, and password information.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Preferences</h2>
          <p className="mt-2 text-sm text-slate-500">Set your preferred notification and display options.</p>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
