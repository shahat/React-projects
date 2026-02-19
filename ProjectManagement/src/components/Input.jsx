import React from 'react';

function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-bold uppercase text-stone-500 tracking-wide">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border-2 rounded-lg bg-stone-50 text-stone-700 placeholder-stone-400 focus:outline-none transition-colors ${
          error 
            ? 'border-red-300 focus:border-red-400' 
            : 'border-stone-200 focus:border-stone-400'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

export default Input;
