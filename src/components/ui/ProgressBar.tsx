import React from 'react'

const ProgressBar: React.FC<{value: number}> = ({value}) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
      <div className="bg-university-500 h-3 rounded-full" style={{width: `${Math.min(100, Math.max(0, value))}%`}} />
    </div>
  )
}

export default ProgressBar
