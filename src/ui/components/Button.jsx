import { useState } from 'react';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const [ripple, setRipple] = useState(false);

  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-wide rounded-lg shadow-md shadow-blue-500/50 border border-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white font-bold tracking-wide rounded-lg shadow-md shadow-gray-500/50',
    danger: 'bg-red-500 hover:bg-red-600 text-white font-bold tracking-wide rounded-lg shadow-md shadow-red-500/50',
    success: 'bg-green-500 hover:bg-green-600 text-white font-bold tracking-wide rounded-lg shadow-md shadow-green-500/50',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white font-bold tracking-wide rounded-lg shadow-md shadow-yellow-500/50',
    info: 'bg-blue-500 hover:bg-blue-600 text-white font-bold tracking-wide rounded-lg shadow-md shadow-blue-500/50',
    link: 'text-blue-500 hover:text-blue-600',
    plain: 'border hover:bg-gray-100',
  };

  const handleClick = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  return (
    <button
      className={`${variants[variant]} px-4 py-2 relative overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

