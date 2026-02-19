import React, { useState } from 'react';
import Input from './Input';
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

function NewProject({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

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
      setShowModal(true);
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category,
      priority,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full overflow-y-auto">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7">
          <h2 className="text-2xl font-bold text-stone-800 mb-6">Create New Project</h2>
          
          <div className="space-y-5">
            <Input
              type="text"
              label="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              error={errors.title}
            />
            
            <div>
              <label className="block text-sm font-bold uppercase text-stone-500 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project..."
                className={`w-full p-3 border-2 rounded-lg bg-stone-50 text-stone-700 focus:outline-none focus:border-stone-500 transition-colors resize-none min-h-[100px] ${errors.description ? 'border-red-300' : 'border-stone-200'}`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
              )}
            </div>

            <Input
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              error={errors.dueDate}
            />

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
                    className={`p-2.5 rounded-lg border-2 transition-all duration-200 ${
                      category === cat.id
                        ? `${cat.borderColor} bg-stone-50`
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1.5">
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
                    className={`p-2.5 rounded-lg border-2 transition-all duration-200 ${
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

          <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-stone-200">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-stone-800 text-white rounded-lg hover:bg-stone-900 shadow-md hover:shadow-lg transition-all font-medium"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={handleCloseModal} title="Invalid Input">
        <div className="p-2">
          <p className="text-stone-600 mb-4">
            Please fill in all required fields:
          </p>
          <ul className="list-disc list-inside text-sm text-stone-500">
            {errors.title && <li className="text-red-500">{errors.title}</li>}
            {errors.description && <li className="text-red-500">{errors.description}</li>}
            {errors.dueDate && <li className="text-red-500">{errors.dueDate}</li>}
          </ul>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NewProject;
