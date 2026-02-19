import React from 'react';
import noProject from '../assets/no-projects.png';

function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
      <div className="max-w-md text-center">
        <div className="mb-6">
          <img
            src={noProject}
            alt="No project selected"
            className="w-28 h-28 mx-auto object-contain opacity-50"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-stone-700 mb-3">
          No Project Selected
        </h2>
        
        <p className="text-stone-500 mb-8 leading-relaxed">
          Select a project from the sidebar to view its details and tasks, or create a new project to get started.
        </p>
        
        <button
          onClick={onStartAddProject}
          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-900 font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Create New Project
        </button>

        <div className="mt-10 pt-6 border-t border-stone-200">
          <p className="text-xs text-stone-400 mb-3 font-medium uppercase tracking-wide">Quick Tips</p>
          <div className="grid grid-cols-3 gap-3 text-left">
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <p className="text-xs text-amber-700 font-medium">Organize</p>
              <p className="text-xs text-amber-600/70 mt-1">Group by category</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-green-700 font-medium">Track</p>
              <p className="text-xs text-green-600/70 mt-1">Monitor progress</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-pink-700 font-medium">Plan</p>
              <p className="text-xs text-pink-600/70 mt-1">Set due dates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoProjectSelected;
