import React from "react";

export const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4">
        {children}
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          &times;
        </button>
      </div>
    </div>
  );
};
