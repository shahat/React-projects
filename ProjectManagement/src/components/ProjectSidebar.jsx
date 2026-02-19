import React, { useState } from 'react';
import Button from './Button';

const CATEGORIES = [
  { id: 'work', label: 'Work', color: 'bg-amber-700' },
  { id: 'personal', label: 'Personal', color: 'bg-orange-700' },
  { id: 'development', label: 'Development', color: 'bg-yellow-700' },
  { id: 'design', label: 'Design', color: 'bg-pink-700' },
  { id: 'marketing', label: 'Marketing', color: 'bg-orange-600' },
  { id: 'other', label: 'Other', color: 'bg-stone-500' },
];

function ProjectSidebar({ projects, tasks, onStartAddProject, onSelectProject, selectedProjectId, helpers, searchQuery, onSearchChange }) {
  const getCategoryColor = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category?.color || 'bg-stone-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 px-3 py-4 md:px-5 md:py-6 bg-stone-800 text-stone-100 md:rounded-r-2xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold uppercase md:text-lg text-stone-200 tracking-wide">
          Your Projects
        </h2>
        <span className="text-xs text-stone-400 bg-stone-700 px-2 py-1 rounded-full">
          {projects.length}
        </span>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-stone-700 border border-stone-600 rounded-lg text-stone-200 placeholder-stone-400 focus:outline-none focus:border-stone-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-5">
        <Button 
          onClick={onStartAddProject}
          className="w-full justify-center flex items-center gap-2 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg transition-colors font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          + Add Project
        </Button>
      </div>

      <ul className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
        {projects && projects.length > 0 ? (
          projects.map((project) => {
            const progress = helpers.getProjectProgress(project.id);
            const taskCount = tasks.filter(t => t.projectId === project.id).length;
            const isSelected = project.id === selectedProjectId;
            const overdue = project.dueDate && isOverdue(project.dueDate) && progress < 100;
            
            return (
              <li key={project.id}>
                <button
                  onClick={() => onSelectProject(project.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isSelected 
                      ? 'bg-stone-700 text-white shadow-md' 
                      : 'hover:bg-stone-700/50 text-stone-300 hover:text-stone-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getCategoryColor(project.category)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{project.title}</span>
                        {overdue && (
                          <span className="text-xs bg-red-600 text-white px-1.5 py-0.5 rounded ml-2 flex-shrink-0">
                            !
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-500">
                        {project.dueDate && (
                          <span className={overdue ? 'text-red-400' : 'text-stone-400'}>
                            {formatDate(project.dueDate)}
                          </span>
                        )}
                        <span className={taskCount > 0 ? 'text-stone-500' : 'text-stone-600'}>
                          • {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
                        </span>
                      </div>
                      
                      {taskCount > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-stone-500">Progress</span>
                            <span className={`${progress === 100 ? 'text-green-400' : 'text-stone-400'}`}>
                              {progress}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-stone-600 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                progress === 100 ? 'bg-green-500' : progress > 50 ? 'bg-amber-500' : 'bg-yellow-600'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })
        ) : (
          <li className="text-center py-8 text-stone-500 text-sm">
            <p>{searchQuery ? 'No projects found' : 'No projects yet'}</p>
            <p className="text-stone-600 text-xs mt-1">
              {searchQuery ? 'Try a different search' : 'Create your first project'}
            </p>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default ProjectSidebar;
