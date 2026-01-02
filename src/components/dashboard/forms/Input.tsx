import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  label,
  name,
  onChange,
  value,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={name} className="mb-2 block">
          {label}
        </label>
      )}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}

       
        {...(type !== "file" ? { value } : {})}

        {...props}
        className="px-3 py-2 w-full rounded-md border-2 border-gray outline-none transition-all duration-300 focus:border-[#91b6d8]"
      />
    </div>
  );
};

export default Input;
