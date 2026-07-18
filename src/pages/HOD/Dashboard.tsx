import React, { useMemo, useState } from 'react'
import Card from '../../components/ui/Card'
import ProgressChart from '../../components/charts/ProgressChart'
import { getStorage, setStorage } from '../../utils/storage'
import { sampleFaculty, sampleTasks, sampleTopics } from '../../data/sampleData'
import Button from '../../components/ui/Button'
import { exportFacultyReportExcel } from '../../utils/exporterExcel'

const HODDashboard: React.FC = () => {
  const faculty = getStorage<any[]>('fh_faculty') || sampleFaculty
  const tasks = getStorage<any[]>('fh_tasks') || sampleTasks
  const [topics, setTopics] = useState<any[]>(() => getStorage<any[]>('fh_topics') || sampleTopics)

  const [topicName, setTopicName] = useState('')

  const stageCounts = useMemo(() => {
    const counts = { pending: 0, 'in-progress': 0, completed: 0, overdue: 0 }
    tasks.forEach((task:any) => {
      if (counts[task.status] !== undefined) counts[task.status] += 1
    })
    return counts
  }, [tasks])

  const totalTasks = tasks.length
  const completePct = totalTasks ? Math.round((stageCounts.completed / totalTasks) * 100) : 0

  const facultyProgress = faculty.map((f:any) => {
    const assigned = tasks.filter((task:any) => task.assignee === f.id).length
    const completed = tasks.filter((task:any) => task.assignee === f.id && task.status === 'completed').length
    const progress = assigned ? Math.round((completed / assigned) * 100) : 0
    return { ...f, assigned, completed, progress }
  })

  const stageSummary = useMemo(() => {
    const summary:any = {}
    facultyProgress.forEach((member:any) => {
      const stage = member.progress >= 80 ? 'Near Completion' : member.progress >= 40 ? 'In Progress' : 'Starting'
      summary[stage] = (summary[stage] || 0) + 1
    })
    return summary
  }, [facultyProgress])

  const addTopic = () => {
    if (!topicName.trim()) return
    const next = [...topics, { id: `topic-${Date.now()}`, name: topicName.trim(), addedBy: 'HOD', createdAt: new Date().toISOString().slice(0,10) }]
    setTopics(next)
    setStorage('fh_topics', next)
    setTopicName('')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-4">
        <Card>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-gray-500">Faculty Count</div>
              <div className="text-2xl font-bold">{faculty.length}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-gray-500">Pending Tasks</div>
              <div className="text-2xl font-bold text-blue-600">{stageCounts.pending}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-gray-500">Overdue Tasks</div>
              <div className="text-2xl font-bold text-red-600">{stageCounts.overdue}</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Completion Percentage</div>
              <div className="text-2xl font-bold">{completePct}%</div>
            </div>
            <Button onClick={exportFacultyReportExcel}>Download report</Button>
          </div>
          <ProgressChart completed={stageCounts.completed} pending={stageCounts.pending} overdue={stageCounts.overdue} />
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-semibold">Add topic</h3>
            <p className="text-sm text-gray-500">Add a topic name and save it immediately for HOD review.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={topicName}
              onChange={e => setTopicName(e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-200 p-3"
              placeholder="Enter topic name"
            />
            <Button onClick={addTopic}>Add topic</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <h3 className="font-semibold mb-4">Topics</h3>
          <div className="space-y-3">
            {topics.map((topic:any) => (
              <div key={topic.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <div className="font-semibold">{topic.name}</div>
                  <div className="text-xs text-gray-500">Added by {topic.addedBy} on {topic.createdAt}</div>
                </div>
                <div className="text-xs text-gray-500">#{topic.id.split('-')[1]}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Faculty stage summary</h3>
          <div className="space-y-3">
            {Object.entries(stageSummary).map(([stage, count]) => (
              <div key={stage} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div>
                  <div className="font-semibold">{stage}</div>
                  <div className="text-xs text-gray-500">Faculty members in this stage</div>
                </div>
                <div className="text-2xl font-bold">{count}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Faculty progress</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {facultyProgress.map((member:any) => (
            <div key={member.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.email}</div>
                </div>
                <div className="text-sm font-semibold text-slate-700">{member.progress}%</div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-university-500" style={{ width: `${member.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default HODDashboard
