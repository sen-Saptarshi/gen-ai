import React from "react";

export function InputBox({
  variant = "default",
  className = "",
  ...props
}) {
  return (
    <input
      className={`border rounded-md px-3 py-2 focus:outline-none focus:ring bg-gray-800 text-white ${variant === "default" ? "border-gray-700" : `border-${variant}-500 focus:ring-${variant}-200`} ${className}`}
      {...props}
    />
  );
}



