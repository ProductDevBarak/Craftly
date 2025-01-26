import React, { useState } from 'react';

const Radio = ({ label, value, checked, onChange }) => {
  const handleChange = () => {
    if (!checked) {
      onChange(value);
    }
  };

  return (
    <div
      onClick={handleChange}
      className="radio-button"
      style={{
        flex: 1,
        textAlign: 'center',
        padding: '5px 5px 5px 5px ',
        cursor: 'pointer',
        backgroundColor: checked ? '#65E06B' : '#1E1E1E',
        color: checked ? '#FFFFFF' : '#white',
        borderRight: '2px solid #646464',
        transition: 'all 0.3s',
        fontFamily: 'DM Sans',
        fontSize: '17px'
      }}
    >
      {label}
      <style>
        {`
          .radio-button:last-child {
             border-right: none !important;
          }
        `}
      </style>
    </div>
  );
};

const RadioGroup = ({ options, defaultValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (value) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <div
      style={{
        display: 'flex',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid #646464',
        width: '100%',
      }}
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          checked={option.value === selectedValue}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
