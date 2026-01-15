import React from "react";

type InputProps = {
  label?: string;
  name: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = "",
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-2.5"
        >
          {label}
          {required && (
            <span className="text-red"> *</span>
          )}
        </label>
      )}

      <input
        type={type}
        name={name}
        id={id || name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`rounded-lg border w-full py-3 px-5 outline-none duration-200 
          bg-gray-1 placeholder:text-dark-5
          ${
            error
              ? "border-red focus:ring-red/20"
              : "border-gray-3 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          }
          ${className}
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
