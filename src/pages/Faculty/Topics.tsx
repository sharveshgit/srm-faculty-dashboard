import React, { useEffect, useMemo, useState } from 'react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { getStorage } from '../../utils/storage'
import { sampleTasks, sampleTopics, Task, Topic } from '../../data/sampleData'

const TopicsPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const loadData = () => {
    setTopics(getStorage<Topic[]>('fh_topics') || sampleTopics)
    setTasks(getStorage<Task[]>('fh_tasks') || sampleTasks)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'fh_topics' || event.key === 'fh_tasks') {
        loadData()
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const tasksByTopic = useMemo(
    () =>
      topics.map(topic => ({
        topic,
        tasks: tasks.filter(task => task.topicId === topic.id),
      })),
    [topics, tasks]
  )

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Faculty</h2>
            <p className="text-sm text-gray-500">Review faculty topics and related tasks for your department work.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              {topics.length} topics
            </div>
            <Button variant="secondary" onClick={loadData}>Refresh</Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        {tasksByTopic.map(({ topic, tasks }) => (
          <Card key={topic.id}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-base font-semibold">{topic.name}</div>
                <div className="text-xs text-gray-500">Added by {topic.addedBy} on {topic.createdAt}</div>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{tasks.length} related task{tasks.length === 1 ? '' : 's'}</div>
            </div>
            <div className="mt-4 space-y-3">
              {tasks.length ? (
                tasks.map(task => (
                  <div key={task.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="font-medium">{task.title}</div>
                    <div className="mt-1 text-xs text-gray-500">Due {task.dueDate} • {task.status.replace('-', ' ')}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  No tasks are currently linked to this topic.
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-sm text-gray-600">
          Topic data is loaded from local storage and updates when tasks or topics are changed in the app.
        </div>
      </Card>
    </div>
  )
}

export default TopicsPage
