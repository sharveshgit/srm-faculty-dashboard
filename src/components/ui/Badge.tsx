import React from 'react'

const Badge: React.FC<{children: React.ReactNode, color?: 'green'|'yellow'|'red'|'blue'}> = ({children, color='blue'}) => {
  const bg = color === 'green' ? 'bg-green-100 text-green-700' : color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : color === 'red' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${bg}`}>{children}</span>
}

export default Badge
