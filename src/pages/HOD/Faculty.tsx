import React from 'react'
import Card from '../../components/ui/Card'
import { sampleFaculty } from '../../data/sampleData'
import { getStorage } from '../../utils/storage'
import Button from '../../components/ui/Button'
import { exportFacultyReportExcel } from '../../utils/exporterExcel'

const HODFaculty: React.FC = () => {
  const today = new Date().toISOString().slice(0,10)
  const faculty = getStorage<any[]>('fh_faculty') || sampleFaculty
  const tasks = getStorage<any[]>('fh_tasks') || []
  const attendance = getStorage<any[]>('fh_attendance') || []

  const facultyStatus = faculty.map(f => {
    const tasksAssigned = tasks.filter((t:any) => t.assignee === f.id).length
    const tasksCompleted = tasks.filter((t:any) => t.assignee === f.id && t.status === 'completed').length
    const att = attendance.find((a:any) => a.facultyId === f.id && a.date === today)
    return { ...f, tasksAssigned, tasksCompleted, present: att ? att.present : false }
  })

  const presentCount = facultyStatus.filter((f:any) => f.present).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Faculty Monitor</h2>
        <div className="text-sm">Present today: <strong>{presentCount}</strong> / {facultyStatus.length}</div>
      </div>

      <Card>
        <div className="flex justify-end mb-3">
          <Button onClick={exportFacultyReportExcel}>Export Excel</Button>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500"><tr><th>Name</th><th>Assigned</th><th>Completed</th><th>Present</th></tr></thead>
          <tbody>
            {facultyStatus.map(f => (
              <tr key={f.id} className="border-t"><td>{f.name}</td><td>{f.tasksAssigned}</td><td>{f.tasksCompleted}</td><td>{f.present? 'Yes':'No'}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default HODFaculty
