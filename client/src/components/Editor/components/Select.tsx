import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  defaultValue?: string;
  onChange: (value: string) => void;
  size?: 'small' | 'medium' | 'large';
  width?: number;
  backgroundColor?: string;
  dropdownBackgroundColor?: string;
  dropdownHoverColor?: string;
  style?: React.CSSProperties;
}

const Select: React.FC<CustomDropdownProps> = ({
  options,
  defaultValue = '',
  onChange,
  size = 'medium',
  width = 200,
  backgroundColor = '#1E1E1E',
  dropdownBackgroundColor = 'black',
  dropdownHoverColor = '#65E06F',
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange(value);
  };

  const sizeStyles = {
    small: { fontSize: '12px', padding: '8px' },
    medium: { fontSize: '14px', padding: '10px' },
    large: { fontSize: '16px', padding: '12px' },
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        width,
        ...style,
      }}
    >
      {/* Dropdown Header */}
      <div
        onClick={toggleDropdown}
        style={{
          ...sizeStyles[size],
          backgroundColor,
          color: 'white',
          border: '1px solid gray',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {selectedValue || 'Select an option'}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: dropdownBackgroundColor,
            border: '1px solid gray',
            borderRadius: '4px',
            marginTop: '4px',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                color: 'white',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = dropdownHoverColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = dropdownBackgroundColor)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;