import React from 'react'

interface InputProps {
    type?: string;
    placeholder?: string;
    label?: string;
    name?: string;
    onChange?: any;
    value?: string | number | any;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder = 'Enter Text',
    label = "Input Name",
    name = "name",
    onChange,
    value,
}) => {
    return (
        <div className='flex-col w-full'>
            <label className='mb-2 block' htmlFor={name}>{label}</label>
            <input
                value={value}
                name={name}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className='px-3
                py-2 w-full 
                rounded-md 
                border-2 border-gray outline-none flex duration-[.5s] transition-all ease-in-out focus:border-[#91b6d8]'
            />
        </div>
    )
}

export default Input