import React, { useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { parseCSV } from '../../utils/csv'
import { setStorage, getStorage } from '../../utils/storage'

const mapping = {
  tasks: 'fh_tasks',
  projects: 'fh_projects',
  faculty: 'fh_faculty',
  attendance: 'fh_attendance',
  events: 'fh_events'
}

const ImportData: React.FC = () => {
  const [type, setType] = useState<'tasks'|'projects'|'faculty'|'attendance'|'events'>('tasks')
  const [preview, setPreview] = useState<any[] | null>(null)

  const onFile = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      if (file.name.endsWith('.json')) {
        try { const data = JSON.parse(text); setPreview(Array.isArray(data)?data:[data]) } catch { alert('Invalid JSON') }
      } else {
        const data = parseCSV(text)
        setPreview(data)
      }
    }
    reader.readAsText(file)
  }

  const importNow = () => {
    if (!preview) return alert('No data to import')
    const key = mapping[type]
    setStorage(key, preview)
    alert('Imported to ' + key)
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Import Data (CSV or JSON)</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <select value={type} onChange={e=>setType(e.target.value as any)} className="border p-2 rounded">
            <option value="tasks">Tasks</option>
            <option value="projects">Projects</option>
            <option value="faculty">Faculty</option>
            <option value="attendance">Attendance</option>
            <option value="events">Events</option>
          </select>
          <input type="file" accept=".csv,.json" onChange={e=>onFile(e.target.files?.[0]||null)} />
          <div className="flex items-center gap-2">
            <Button onClick={importNow}>Import</Button>
            <Button variant="secondary" onClick={()=>{ setPreview(null); }}>Clear</Button>
          </div>
        </div>

        {preview && (
          <div className="mt-4">
            <div className="text-sm text-gray-500 mb-2">Preview ({preview.length} rows)</div>
            <div className="overflow-auto max-h-60 border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100"><tr>{Object.keys(preview[0]).map(k=> <th key={k} className="p-2 text-left">{k}</th>)}</tr></thead>
                <tbody>{preview.map((r,i)=> (<tr key={i} className="border-t">{Object.values(r).map((v,idx)=> <td key={idx} className="p-2">{String(v)}</td>)}</tr>))}</tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ImportData
