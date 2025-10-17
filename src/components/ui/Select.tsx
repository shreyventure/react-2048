import { SelectHTMLAttributes } from 'react';
import { THEME_COLORS } from '../../constants/game';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  onChange: (value: string | number) => void;
  label?: string;
}

const Select = ({ options, onChange, label, className = '', ...props }: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // Try to convert to number if it's a valid number
    const numValue = Number(value);
    onChange(isNaN(numValue) ? value : numValue);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        onChange={handleChange}
        className={`bg-[${THEME_COLORS.buttonPrimary}] text-white px-4 py-2 text-sm rounded-lg border-none outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-[${THEME_COLORS.buttonPrimary}] ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;