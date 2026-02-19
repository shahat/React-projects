import React, { useState } from 'react';
import Tasks from './Tasks';
import EditProject from './EditProject';

const CATEGORIES = {
  work: { label: 'Work', color: 'bg-amber-700' },
  personal: { label: 'Personal', color: 'bg-orange-700' },
  development: { label: 'Development', color: 'bg-yellow-700' },
  design: { label: 'Design', color: 'bg-pink-700' },
  marketing: { label: 'Marketing', color: 'bg-orange-600' },
  other: { label: 'Other', color: 'bg-stone-500' },
};

const PRIORITIES = {
  low: { label: 'Low', color: 'bg-green-600', textColor: 'text-green-700', bgColor: 'bg-green-50' },
  medium: { label: 'Medium', color: 'bg-yellow-600', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
  high: { label: 'High', color: 'bg-red-600', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  urgent: { label: 'Urgent', color: 'bg-red-800', textColor: 'text-red-800', bgColor: 'bg-red-100' },
};

function SelectedProject({ project, tasks, stats, progress, onDelete, onUpdate, onAddTask, onUpdateTask, onDeleteTask, onAddComment, onDeleteComment, onReorderTasks }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isOverdue = () => {
    if (!project.dueDate) return false;
    return new Date(project.dueDate) < new Date() && progress < 100;
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const handleEditSave = (updatedProject) => {
    onUpdate(updatedProject);
  };

  const category = CATEGORIES[project.category] || CATEGORIES.other;
  const priority = PRIORITIES[project.priority] || PRIORITIES.medium;

  return (
    <div className="p-4 md:p-6 lg:p-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 mb-5">
          <header className="pb-5 border-b border-stone-200">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="text-sm font-medium text-stone-500">{category.label}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">{project.title}</h1>
                <p className="text-stone-600 whitespace-pre-wrap leading-relaxed">{project.description}</p>
              </div>
              <div className="flex flex-row md:flex-col items-start md:items-end gap-2">
                <button onClick={() => setShowEditModal(true)} className="px-4 py-2 text-stone-600 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors font-medium flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                  Edit
                </button>
                <button onClick={handleDelete} className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${showDeleteConfirm ? 'bg-red-600 text-white hover:bg-red-700' : 'text-red-600 hover:bg-red-50'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {showDeleteConfirm ? 'Confirm' : 'Delete'}
                </button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5">
            <div className="p-3 rounded-lg bg-stone-100">
              <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Due Date</p>
              <p className={`font-medium ${isOverdue() ? 'text-red-600' : 'text-stone-700'}`}>{formatDate(project.dueDate)}</p>
              {isOverdue() && <span className="inline-block mt-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">Overdue</span>}
            </div>
            <div className="p-3 rounded-lg bg-stone-100">
              <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Priority</p>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${priority.textColor} ${priority.bgColor}`}><span className={`w-2 h-2 rounded-full ${priority.color}`} />{priority.label}</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-100">
              <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Status</p>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">Active</span>
            </div>
            <div className="p-3 rounded-lg bg-stone-100">
              <p className="text-xs font-semibold text-stone-500 uppercase mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-green-600' : progress > 50 ? 'bg-amber-600' : 'bg-yellow-600'}`} style={{ width: `${progress}%` }} />
                </div>
                <span className={`text-sm font-bold ${progress === 100 ? 'text-green-600' : 'text-stone-700'}`}>{progress}%</span>
              </div>
            </div>
          </div>

          {stats.total > 0 && (
            <div className="flex items-center gap-4 md:gap-6 pt-5 mt-4 border-t border-stone-200">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-stone-400" /><span className="text-sm text-stone-600">{stats.todo} Todo</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-sm text-stone-600">{stats.inProgress} In Progress</span></div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-600" /><span className="text-sm text-stone-600">{stats.done} Done</span></div>
            </div>
          )}
        </div>

        <Tasks tasks={tasks} onAdd={onAddTask} onUpdate={onUpdateTask} onDelete={onDeleteTask} onAddComment={onAddComment} onDeleteComment={onDeleteComment} onReorderTasks={onReorderTasks} />
      </div>

      <EditProject project={project} isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSave={handleEditSave} />
    </div>
  );
}

export default SelectedProject;
