import React, { useState } from 'react';
import Modal from './Modal';

const CATEGORIES = [
  { id: 'work', label: 'Work', color: 'bg-amber-700', borderColor: 'border-amber-700' },
  { id: 'personal', label: 'Personal', color: 'bg-orange-700', borderColor: 'border-orange-700' },
  { id: 'development', label: 'Development', color: 'bg-yellow-700', borderColor: 'border-yellow-700' },
  { id: 'design', label: 'Design', color: 'bg-pink-700', borderColor: 'border-pink-700' },
  { id: 'marketing', label: 'Marketing', color: 'bg-orange-600', borderColor: 'border-orange-600' },
  { id: 'other', label: 'Other', color: 'bg-stone-500', borderColor: 'border-stone-500' },
];

const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'bg-green-600', textColor: 'text-green-700', bgColor: 'bg-green-50' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-600', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
  { id: 'high', label: 'High', color: 'bg-red-600', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  { id: 'urgent', label: 'Urgent', color: 'bg-red-800', textColor: 'text-red-800', bgColor: 'bg-red-100' },
];

function EditProject({ project, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [dueDate, setDueDate] = useState(project?.dueDate || '');
  const [category, setCategory] = useState(project?.category || 'work');
  const [priority, setPriority] = useState(project?.priority || 'medium');
  const [errors, setErrors] = useState({});

  // Update form when project changes
  React.useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setDueDate(project.dueDate || '');
      setCategory(project.category || 'work');
      setPriority(project.priority || 'medium');
    }
  }, [project]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      return;
    }

    onSave({
      ...project,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category,
      priority,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold uppercase text-stone-500 mb-1">
            Project Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-stone-50 text-stone-700 focus:outline-none transition-colors ${
              errors.title ? 'border-red-300' : 'border-stone-200 focus:border-stone-400'
            }`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold uppercase text-stone-500 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-stone-50 text-stone-700 focus:outline-none transition-colors resize-none min-h-[80px] ${
              errors.description ? 'border-red-300' : 'border-stone-200 focus:border-stone-400'
            }`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold uppercase text-stone-500 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-stone-50 text-stone-700 focus:outline-none transition-colors ${
              errors.dueDate ? 'border-red-300' : 'border-stone-200 focus:border-stone-400'
            }`}
          />
          {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-bold uppercase text-stone-500 mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                  category === cat.id
                    ? `${cat.borderColor} bg-stone-50`
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span className="text-xs font-medium text-stone-600">{cat.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Priority Selection */}
        <div>
          <label className="block text-sm font-bold uppercase text-stone-500 mb-2">
            Priority
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRIORITIES.map((pri) => (
              <button
                key={pri.id}
                type="button"
                onClick={() => setPriority(pri.id)}
                className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                  priority === pri.id
                    ? `${pri.bgColor} ${pri.textColor} border-current`
                    : 'border-stone-200 hover:border-stone-300 text-stone-600'
                }`}
              >
                <span className="text-xs font-semibold">{pri.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-stone-200">
        <button
          onClick={onClose}
          className="px-4 py-2 text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 shadow-md hover:shadow-lg transition-all font-medium"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
}

export default EditProject;
