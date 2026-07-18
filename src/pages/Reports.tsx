import React from 'react'
import Card from '../components/ui/Card'

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="mt-2 text-sm text-slate-500">Generate and review summary reports for faculty work, attendance, and events.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <h2 className="text-lg font-semibold">Attendance Report</h2>
          <p className="mt-2 text-sm text-slate-500">View attendance summaries and trends over time.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Task Analysis</h2>
          <p className="mt-2 text-sm text-slate-500">See pending, completed, and overdue task statistics.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Event Overview</h2>
          <p className="mt-2 text-sm text-slate-500">Track upcoming events and participation details.</p>
        </Card>
      </div>
    </div>
  )
}

export default ReportsPage
