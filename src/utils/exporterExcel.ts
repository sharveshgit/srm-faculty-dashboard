import * as XLSX from 'xlsx'
import { getStorage } from './storage'
import { sampleFaculty, sampleTasks } from '../data/sampleData'

export function exportFacultyReportExcel() {
  const faculties = getStorage<any[]>('fh_faculty') || sampleFaculty
  const tasks = getStorage<any[]>('fh_tasks') || sampleTasks
  const today = new Date().toISOString().slice(0,10)

  const rows = faculties.map(f => {
    const assigned = tasks.filter(t => t.assignee === f.id).length
    const completed = tasks.filter(t => t.assignee === f.id && t.status === 'completed').length
    return { id: f.id, name: f.name, email: f.email, assigned, completed, date: today }
  })

  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'FacultyReport')
  XLSX.writeFile(wb, `faculty-report-${today}.xlsx`)
}
