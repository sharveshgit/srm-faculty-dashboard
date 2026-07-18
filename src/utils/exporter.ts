import jsPDF from 'jspdf'
import { Project } from '../data/sampleData'

export function exportProjectPDF(project: Project) {
  const doc = new jsPDF()
  doc.setFontSize(18)
  doc.text(project.title, 14, 20)
  doc.setFontSize(12)
  doc.text(`Status: ${project.status}`, 14, 30)
  doc.text(`Progress: ${project.progress}%`, 14, 38)
  if (project.description) {
    doc.text('Description:', 14, 48)
    const lines = doc.splitTextToSize(project.description, 180)
    doc.text(lines, 14, 56)
  }
  doc.save(`${project.id || 'project'}.pdf`)
}
