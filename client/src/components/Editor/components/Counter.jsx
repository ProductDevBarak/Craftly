import React, { useState } from 'react';

const CustomInputValueWithImages = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue((prevValue) => Math.min(prevValue + 1, 100)); 
  };

  const handleDecrement = () => {
    setValue((prevValue) => Math.max(prevValue - 1, 0)); 
  };

  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setValue(newValue);
    }
  };

  return (
    <div
      style={{
        width: '50%',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '120px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '5px',
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '16px',
          }}
        />
        
        <svg
          onClick={handleDecrement}
          style={{
            position: 'absolute',
            right: '5px',
            top: '15px',
            cursor: 'pointer',
          }}
          width="16"
          height="16"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Controls">
            <path
              id="chevron-up"
              d="M14.0625 7.4375L9 12.5L3.9375 7.4375"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <svg
          onClick={handleIncrement}
          style={{
            position: 'absolute',
            right: '5px',
            top: '4px',
            cursor: 'pointer',
          }}
          transform='rotate(180)'
          width="16"
          height="16"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Controls">
            <path
              id="chevron-up"
              d="M14.0625 7.4375L9 12.5L3.9375 7.4375"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <style>
        {`
            input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
        }
        `}
      </style>
    </div>
  );
};

export default CustomInputValueWithImages;
