import React from 'react'

interface ButtonProps {
    onClick?: any,
    children?: any,
    className?: string,
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => {
    return (
        <button
            className={`px-4 py-2 grid items-center bg-blue-light hover:bg-blue transition-all duration-[.3s] ease-in rounded-md text-white ${className}`}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button