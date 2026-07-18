export type Task = {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  assignee: string
  description?: string
  attachments?: {name:string, url?:string}[]
  topicId?: string
}

export const sampleTasks: Task[] = [
  { id: 't1', title: 'Question Paper Submission', dueDate: '2026-07-10', status: 'pending', assignee: 'sv7491', description: 'Submit question paper for CS101', topicId: 'topic1' },
  { id: 't2', title: 'Attendance Update', dueDate: '2026-07-03', status: 'completed', assignee: 'sv7491', topicId: 'topic2' },
  { id: 't3', title: 'Internal Marks Upload', dueDate: '2026-07-15', status: 'in-progress', assignee: 'sv7491', topicId: 'topic1' },
  { id: 't4', title: 'Lesson Plan Submission', dueDate: '2026-06-28', status: 'overdue', assignee: 'sv7491', topicId: 'topic2' },
  { id: 't5', title: 'Assignment Evaluation', dueDate: '2026-07-12', status: 'pending', assignee: 'sv7491', topicId: 'topic1' },
  { id: 't6', title: 'Result Submission', dueDate: '2026-07-20', status: 'pending', assignee: 'sv7491', topicId: 'topic2' }
]

export const sampleFaculty = [
  { id: 'sv7491', name: 'Dr. S. Venkatesh', email: 'sv7491@srmist.edu.in', title: 'Associate Professor', department: 'Computer Science', employeeId: 'CS-4127' },
  { id: 'f2', name: 'Dr. Priya Sharma', email: 'priya@srmist.edu.in', title: 'Assistant Professor', department: 'Computer Science', employeeId: 'CS-4128' }
]

export type Project = {
  id: string
  title: string
  description?: string
  progress: number
  status: 'in-progress' | 'incomplete' | 'completed'
}

export const sampleProjects: Project[] = [
  { id: 'p1', title: 'Distributed Systems Research', description: 'Paper draft for IEEE ICDCS submission.', progress: 60, status: 'in-progress' },
  { id: 'p2', title: 'Curriculum Modernization', description: 'Refresh CS201 to include modern DevOps modules.', progress: 15, status: 'incomplete' },
  { id: 'p3', title: 'Lab Infrastructure Upgrade', description: 'Replace old PCs and install new software.', progress: 40, status: 'in-progress' }
]

export type Topic = {
  id: string
  name: string
  addedBy: string
  createdAt: string
}

export const sampleTopics: Topic[] = [
  { id: 'topic1', name: 'Research Publication', addedBy: 'admin', createdAt: '2026-07-01' },
  { id: 'topic2', name: 'Course Alignment', addedBy: 'admin', createdAt: '2026-07-02' }
]

export type AttendanceRecord = {
  facultyId: string
  date: string // ISO date
  present: boolean
  notes?: string
}

export const sampleAttendance: AttendanceRecord[] = [
  { facultyId: 'sv7491', date: '2026-07-05', present: true },
  { facultyId: 'f2', date: '2026-07-05', present: false }
]

export type EventItem = {
  id: string
  title: string
  date: string
  description?: string
}

export const sampleEvents: EventItem[] = [
  { id: 'e1', title: 'Guest Lecture: AI Ethics', date: '2026-07-08', description: 'Special class on AI ethics for CS students.' }
]

