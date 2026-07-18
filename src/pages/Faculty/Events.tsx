import React, { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { sampleEvents, EventItem } from '../../data/sampleData'

const STORAGE_KEY = 'fh_events'

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(()=>{
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setEvents(JSON.parse(raw))
    else { setEvents(sampleEvents); localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEvents)) }
  },[])

  const save = (next:EventItem[]) => { setEvents(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }

  const add = () => {
    if (!title || !date) return
    const e:EventItem = { id: 'e'+Date.now(), title, date, description: desc }
    save([e, ...events])
    setOpen(false); setTitle(''); setDate(''); setDesc('')
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Events & Special Classes</h2>
          <Button variant="primary" onClick={()=>setOpen(true)}>+ New Event</Button>
        </div>
        <div className="mt-4 divide-y">
          {events.map(ev => (
            <div key={ev.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{ev.title}</div>
                <div className="text-xs text-gray-400">{ev.date} — {ev.description}</div>
              </div>
              <div>
                <Button onClick={()=>{ const a = document.createElement('a'); a.href = '#'; a.download = `${ev.id}.txt`; a.click();}}>Download</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal open={open} title="New Event" onClose={()=>setOpen(false)}>
        <div className="space-y-3">
          <div>
            <label className="block text-sm">Title</label>
            <input className="w-full border rounded p-2" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Date</label>
            <input type="date" className="w-full border rounded p-2" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea className="w-full border rounded p-2" value={desc} onChange={e=>setDesc(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={()=>setOpen(false)}>Cancel</Button>
            <Button className="ml-2" onClick={add}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EventsPage
