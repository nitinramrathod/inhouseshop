import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-light flex gap-2 items-center text-white hover:bg-blue transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
