import { useState, useEffect, useRef, cloneElement, Children } from "react";

export const Dropdown = ({
  children,
  className = "",
  buttonLabel = "Menu",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(buttonLabel);
  const dropdownRef = useRef(null);

  const handleClick = () => setIsOpen((prev) => !prev);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  return (
    <div ref={dropdownRef} className={`relative mt-2 ${className}`}>
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onClick={handleClick}
      >
        {selectedOption}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id="dropdown-menu"
        className={`absolute mt-2 w-48 bg-white rounded-lg shadow-lg transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ transformOrigin: "top left" }}
      >
        <ul className="py-1">
          {Children.map(children, (child) =>
            cloneElement(child, {
              onClick: () =>
                handleOptionClick(child.props.value || child.props.children),
              className: `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer ${
                child.props.className || ""
              }`,
            })
          )}
        </ul>
      </div>
    </div>
  );
};
