import React, { useState } from 'react';

const PRIORITIES = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
];

function NewTask({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      setError(true);
      return;
    }
    
    onAdd({
      text: text.trim(),
      priority,
      dueDate: dueDate || null,
    });
    
    setText('');
    setPriority('medium');
    setDueDate('');
    setError(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.trim()) setError(false);
          }}
          onKeyDown={handleKeyPress}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-3 rounded-xl border-2 bg-white text-stone-700 placeholder-stone-400 focus:outline-none transition-colors ${
            error 
              ? 'border-red-300 focus:border-red-400' 
              : 'border-stone-200 focus:border-stone-400'
          }`}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-medium transition-colors shadow-md hover:shadow-lg"
        >
          Add Task
        </button>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Priority Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500">Priority:</span>
          <div className="flex rounded-lg border border-stone-200 overflow-hidden">
            {PRIORITIES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPriority(p.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  priority === p.id
                    ? p.id === 'low' 
                      ? 'bg-green-600 text-white'
                      : p.id === 'medium'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-red-600 text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-500">Due:</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-1.5 text-xs border border-stone-200 rounded-lg bg-white text-stone-600 focus:outline-none focus:border-stone-400"
          />
        </div>

        {error && (
          <span className="text-red-500 text-sm">Please enter a task</span>
        )}
      </div>
    </form>
  );
}

export default NewTask;
