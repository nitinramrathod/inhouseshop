import React from 'react'

interface InputProps {
    placeholder?: string;
    label?: string;
    name?: string;
    onChange?: any;
    value?: string;
    rows?: number;
    className?: string;
}

const Textarea: React.FC<InputProps> = ({
    placeholder = 'Enter Text',
    label = "Input Name",
    name = "name",
    onChange,
    value = "",
    rows = 5,
    className
}) => {
    return (
        <div className={`flex-col w-full ${className}`}>
            <label className='mb-2 block' htmlFor={name}>{label}</label>
            <textarea
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={` px-3
                py-2 w-full 
                rounded-md 
                border-2 border-gray 
                outline-none flex 
                duration-[.5s] 
                transition-all ease-in-out
                 focus:border-[#91b6d8]
                `}
            />
        </div>
    )
}

export default Textarea