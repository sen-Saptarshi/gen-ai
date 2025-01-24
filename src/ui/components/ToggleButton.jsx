import React, { useState } from 'react';

const ToggleButton = ({ className = '', onToggle }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    if (onToggle) onToggle(!isToggled);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${className} ${
        isToggled ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          isToggled ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default ToggleButton;

