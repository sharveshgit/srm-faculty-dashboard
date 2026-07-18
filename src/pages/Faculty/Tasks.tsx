import React, { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { sampleTasks, Task } from '../../data/sampleData'
import { getStorage, setStorage } from '../../utils/storage'

const STORAGE_KEY = 'fh_tasks'
const DOCUMENT_KEY = 'fh_documents'

type DocumentItem = {
  id: string
  title: string
  taskId: string
  createdAt: string
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [open, setOpen] = useState(false)
  const [present, setPresent] = useState<boolean>(false)
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [docTitle, setDocTitle] = useState('')
  const [docTaskId, setDocTaskId] = useState('')

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setTasks(JSON.parse(raw))
    else {
      setTasks(sampleTasks)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks))
    }

    const docs = getStorage<DocumentItem[]>(DOCUMENT_KEY)
    if (docs) setDocuments(docs)

    const att = localStorage.getItem('fh_attendance')
    const today = new Date().toISOString().slice(0,10)
    if (att) {
      const arr = JSON.parse(att)
      const me = arr.find((a:any)=>a.facultyId==='sv7491' && a.date===today)
      setPresent(!!me?.present)
    }
  }, [])

  const save = (next: Task[]) => {
    setTasks(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const addTask = () => {
    if (!title) return
    const t: Task = { id: 't' + Date.now(), title, dueDate, status: 'pending', assignee: 'sv7491' }
    save([t, ...tasks])
    setTitle(''); setDueDate(''); setOpen(false)
  }

  const toggleStatus = (id:string) => {
    const next = tasks.map(t => {
      if (t.id !== id) return t
      const nextStatus = t.status === 'pending' ? 'in-progress' : t.status === 'in-progress' ? 'completed' : t.status === 'completed' ? 'pending' : t.status
      return {...t, status: nextStatus}
    })
    save(next)
  }

  const statusLabel = (status: Task['status']) => {
    if (status === 'pending') return 'Pending'
    if (status === 'in-progress') return 'In Progress'
    if (status === 'completed') return 'Completed'
    if (status === 'overdue') return 'Overdue'
    return status
  }

  const addDocument = () => {
    if (!docTitle || !docTaskId) return
    const next = [...documents, { id: 'doc-' + Date.now(), title: docTitle, taskId: docTaskId, createdAt: new Date().toISOString().slice(0,10) }]
    setDocuments(next)
    setStorage(DOCUMENT_KEY, next)
    setDocTitle('')
    setDocTaskId('')
  }

  const togglePresent = () => {
    const today = new Date().toISOString().slice(0,10)
    const raw = localStorage.getItem('fh_attendance')
    const arr = raw ? JSON.parse(raw) : []
    const idx = arr.findIndex((a:any)=>a.facultyId==='sv7491' && a.date===today)
    if (idx>=0) arr[idx].present = !arr[idx].present
    else arr.push({ facultyId: 'sv7491', date: today, present: true })
    localStorage.setItem('fh_attendance', JSON.stringify(arr))
    setPresent(prev => !prev)
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.6fr_0.9fr]">
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Tasks</h2>
              <div className="text-sm text-gray-500">Attendance: <strong>{present? 'Present':'Absent'}</strong></div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={togglePresent} className={`px-3 py-2 rounded ${present? 'bg-green-600 text-white':'bg-gray-100 text-gray-700'}`}>
                {present? 'Mark Absent':'Mark Present'}
              </button>
              <Button variant="primary" onClick={() => setOpen(true)}>+ New Task</Button>
            </div>
          </div>
          <div className="mt-4 divide-y">
            {tasks.map(t => (
              <div key={t.id} className="py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className={`${t.status==='completed'?'line-through text-gray-500':''} text-base font-medium`}>{t.title}</div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                    <span>Due {t.dueDate}</span>
                    <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2 py-1">{statusLabel(t.status)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleStatus(t.id)} className="text-sm text-blue-600 hover:underline">
                    Change status
                  </button>
                  <span className="text-xs text-gray-500">Current: {statusLabel(t.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Modal open={open} title="New Task" onClose={() => setOpen(false)}>
          <div className="space-y-3">
            <div>
              <label className="block text-sm">Title</label>
              <input className="w-full border rounded p-2" value={title} onChange={e=>setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm">Due Date</label>
              <input type="date" className="w-full border rounded p-2" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="ml-2" onClick={addTask}>Add</Button>
            </div>
          </div>
        </Modal>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="mt-4 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm">Document name</label>
              <input className="w-full rounded border border-gray-200 p-2" value={docTitle} onChange={e => setDocTitle(e.target.value)} placeholder="Project document title" />
            </div>
            <div>
              <label className="block text-sm">For task</label>
              <select className="w-full rounded border border-gray-200 p-2" value={docTaskId} onChange={e => setDocTaskId(e.target.value)}>
                <option value="">Select task</option>
                {tasks.map(task => (
                  <option key={task.id} value={task.id}>{task.title}</option>
                ))}
              </select>
            </div>
            <Button onClick={addDocument}>Add Document</Button>
          </div>
          <div className="space-y-3">
            {documents.length ? documents.map(doc => {
              const task = tasks.find(t => t.id === doc.taskId)
              return (
                <div key={doc.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="font-medium">{doc.title}</div>
                  <div className="text-xs text-gray-500">Task: {task?.title || 'Unknown'} • {doc.createdAt}</div>
                </div>
              )
            }) : (
              <div className="text-sm text-gray-500">No documents added yet.</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TasksPage
