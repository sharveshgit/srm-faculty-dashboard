import React from 'react'

const Card: React.FC<{children: React.ReactNode, className?: string}> = ({children, className}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded shadow p-4 ${className ?? ''}`}>
      {children}
    </div>
  )
}

export default Card
