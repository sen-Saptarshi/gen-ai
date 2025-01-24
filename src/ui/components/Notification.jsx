export const Notification = ({ children, className = '' }) => (
  <div className={`bg-yellow-500 border-l-4 border-yellow-700 p-4 ${className}`}>{children}</div>
);
