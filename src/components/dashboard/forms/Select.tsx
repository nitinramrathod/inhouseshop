import React from "react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  label?: string;
  value: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  options,
  placeholder = "Select an option",
  required = false,
  onChange,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block pb-2 font-medium text-gray-600"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
