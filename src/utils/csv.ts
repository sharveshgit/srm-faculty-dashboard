export function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== '')
  if (lines.length === 0) return []
  const headers = lines[0].split(',').map(h=>h.trim())
  const rows = lines.slice(1).map(line => {
    const cols = line.split(',')
    const obj:any = {}
    headers.forEach((h,i)=>{
      obj[h] = cols[i] ? cols[i].trim() : ''
    })
    return obj
  })
  return rows
}
