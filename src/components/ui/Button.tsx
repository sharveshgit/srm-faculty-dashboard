import React from 'react'

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary' | 'secondary'}> = ({children, variant='primary', className='', ...rest}) => {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none'
  const v = variant === 'primary' ? 'bg-university-500 text-white hover:bg-university-700' : 'bg-gray-100 dark:bg-gray-700 text-gray-800'
  return (
    <button className={`${base} ${v} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export default Button
