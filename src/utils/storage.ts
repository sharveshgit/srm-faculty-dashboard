import { sampleTasks, sampleProjects, sampleFaculty, sampleEvents, sampleAttendance, sampleTopics } from '../data/sampleData'

export function getStorage<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  try { return JSON.parse(raw) as T } catch { return null }
}

export function setStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

// Initialize only if the specific keys are not already provided by the user.
export function initializeSeedData() {
  if (!localStorage.getItem('fh_tasks')) setStorage('fh_tasks', sampleTasks)
  if (!localStorage.getItem('fh_projects')) setStorage('fh_projects', sampleProjects)
  if (!localStorage.getItem('fh_faculty')) setStorage('fh_faculty', sampleFaculty)
  if (!localStorage.getItem('fh_events')) setStorage('fh_events', sampleEvents)
  if (!localStorage.getItem('fh_attendance')) setStorage('fh_attendance', sampleAttendance)
  if (!localStorage.getItem('fh_topics')) setStorage('fh_topics', sampleTopics)
}
