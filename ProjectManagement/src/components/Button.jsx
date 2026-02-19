import React from 'react';

function Button({ children, className = '', ...props }) {
  return (
    <button 
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
