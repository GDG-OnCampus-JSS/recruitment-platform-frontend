import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex cursor-pointer items-center bg-transparent p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDown size={24} className="text-gray-700" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-300 bg-white shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
