import React, { useEffect, useMemo, useState } from 'react'
import Card from '../../components/ui/Card'
import ProgressChart from '../../components/charts/ProgressChart'
import Modal from '../../components/ui/Modal'
import { getStorage, setStorage } from '../../utils/storage'
import { sampleTasks, sampleProjects, sampleFaculty, Task, Project, sampleTopics } from '../../data/sampleData'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { exportProjectPDF } from '../../utils/exporter'
import { useAuth } from '../../contexts/AuthContext'

const Dashboard: React.FC = () => {
  const auth = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDueDate, setTaskDueDate] = useState('')
  const [taskStatus, setTaskStatus] = useState<Task['status']>('pending')
  const [taskDescription, setTaskDescription] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectProgress, setProjectProgress] = useState(0)
  const [projectStatus, setProjectStatus] = useState<Project['status']>('incomplete')

  useEffect(() => {
    setTasks(getStorage<Task[]>('fh_tasks') || sampleTasks)
    setProjects(getStorage<Project[]>('fh_projects') || sampleProjects)
  }, [])

  const saveTasks = (next: Task[]) => {
    setTasks(next)
    setStorage('fh_tasks', next)
  }

  const saveProjects = (next: Project[]) => {
    setProjects(next)
    setStorage('fh_projects', next)
  }

  const addTask = () => {
    if (!taskTitle.trim() || !taskDueDate) return
    const nextTask: Task = {
      id: `t${Date.now()}`,
      title: taskTitle.trim(),
      dueDate: taskDueDate,
      status: taskStatus,
      assignee: auth.user?.id || 'sv7491',
      description: taskDescription,
    }
    saveTasks([nextTask, ...tasks])
    setTaskTitle('')
    setTaskDueDate('')
    setTaskStatus('pending')
    setTaskDescription('')
    setTaskModalOpen(false)
  }

  const addProject = () => {
    if (!projectTitle.trim()) return
    const nextProject: Project = {
      id: `p${Date.now()}`,
      title: projectTitle.trim(),
      description: projectDescription,
      progress: projectProgress,
      status: projectStatus,
    }
    saveProjects([nextProject, ...projects])
    setProjectTitle('')
    setProjectDescription('')
    setProjectProgress(0)
    setProjectStatus('incomplete')
    setProjectModalOpen(false)
  }

  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'completed').length
  const overdue = tasks.filter(t => t.status === 'overdue').length
  const pending = total - completed - overdue
  const taskCompletion = total ? Math.round((completed / total) * 100) : 0
  const projectCompletion = projects.length ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) : 0
  const weeklyCompletion = Math.round((taskCompletion + projectCompletion) / 2)
  const faculty = sampleFaculty.find(f => f.id === auth.user?.id) || sampleFaculty[0]

  return (
    <div className="space-y-8 pb-8">
      {/* Greeting Section */}
      <div className="space-y-4">
        <div>
          <div className="text-lg uppercase tracking-widest text-blue-600 font-semibold">Good Morning</div>
          <div className="text-5xl font-bold text-slate-900 mt-3">{faculty.name}</div>
          <div className="text-base text-blue-700 mt-2 font-medium">{faculty.title} • {faculty.department}</div>
        </div>
      </div>

      {/* Total Tasks Card */}
      <div>
        <Card className="border-l-4 border-l-blue-600">
          <div className="text-sm text-blue-600 font-semibold uppercase tracking-wide">Total Tasks</div>
          <div className="text-6xl font-bold text-slate-900 mt-4">{total}</div>
        </Card>
      </div>

      {/* Tasks Section */}
      <Card>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900">Tasks</h3>
          <Button variant="secondary" onClick={() => setTaskModalOpen(true)}>+ New task</Button>
        </div>
        <div className="space-y-3">
          {tasks.slice(0, 8).map(t => (
            <div key={t.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`font-medium text-slate-900 ${t.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                    {t.title}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{t.dueDate}</div>
                  {t.description && <div className="text-sm text-slate-600 mt-2">{t.description}</div>}
                </div>
                <div className="ml-4">
                  <Badge color={t.status === 'completed' ? 'green' : t.status === 'overdue' ? 'red' : 'yellow'}>
                    {t.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        {tasks.length > 8 && (
          <div className="text-center mt-4 text-slate-500 text-sm">
            + {tasks.length - 8} more tasks
          </div>
        )}
      </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Projects</h3>
            <Button variant="secondary" onClick={() => setProjectModalOpen(true)}>+ New project</Button>
          </div>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{p.description}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm text-gray-500">{p.progress}%</div>
                    <div>
                      <Button onClick={() => exportProjectPDF(p)} className="text-sm" variant="primary">Download PDF</Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <ProgressBar value={p.progress} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <Badge color={p.status === 'in-progress' ? 'yellow' : p.status === 'completed' ? 'green' : 'blue'}>{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

      <Modal open={taskModalOpen} title="Add Task" onClose={() => setTaskModalOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} className="w-full rounded border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Due date</label>
            <input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} className="w-full rounded border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select value={taskStatus} onChange={e => setTaskStatus(e.target.value as Task['status'])} className="w-full rounded border border-gray-300 p-2">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)} className="w-full rounded border border-gray-300 p-2" rows={4} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setTaskModalOpen(false)}>Cancel</Button>
            <Button onClick={addTask}>Save Task</Button>
          </div>
        </div>
      </Modal>

      <Modal open={projectModalOpen} title="Add Project" onClose={() => setProjectModalOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input value={projectTitle} onChange={e => setProjectTitle(e.target.value)} className="w-full rounded border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea value={projectDescription} onChange={e => setProjectDescription(e.target.value)} className="w-full rounded border border-gray-300 p-2" rows={4} />
          </div>
          <div>
            <label className="block text-sm font-medium">Progress</label>
            <input type="number" min={0} max={100} value={projectProgress} onChange={e => setProjectProgress(Number(e.target.value))} className="w-full rounded border border-gray-300 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select value={projectStatus} onChange={e => setProjectStatus(e.target.value as Project['status'])} className="w-full rounded border border-gray-300 p-2">
              <option value="in-progress">In Progress</option>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setProjectModalOpen(false)}>Cancel</Button>
            <Button onClick={addProject}>Save Project</Button>
          </div>
        </div>
      </Modal>

      <div className="md:hidden text-center text-sm text-gray-500">View is responsive — desktop layout shown above.</div>
    </div>
  )
}

export default Dashboard
