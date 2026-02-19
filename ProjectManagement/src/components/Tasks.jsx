import React, { useState } from 'react';
import NewTask from './NewTask';

const STATUSES = [
  { id: 'todo', label: 'To Do', color: 'bg-stone-500' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-amber-500' },
  { id: 'done', label: 'Done', color: 'bg-green-600' },
];

const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'bg-green-600' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-600' },
  { id: 'high', label: 'High', color: 'bg-red-600' },
];

function Tasks({ tasks, onAdd, onUpdate, onDelete, onAddComment, onDeleteComment, onReorderTasks }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('status');
  const [expandedTask, setExpandedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);
  const [showComments, setShowComments] = useState(null);
  const [newComment, setNewComment] = useState('');

  const filteredTasks = tasks
    .filter(task => filter === 'all' || task.status === filter)
    .sort((a, b) => {
      if (sortBy === 'status') {
        const statusOrder = { 'todo': 0, 'in-progress': 1, 'done': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      if (sortBy === 'priority') {
        const priorityOrder = { 'low': 0, 'medium': 1, 'high': 2 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return (a.order || 0) - (b.order || 0);
    });

  const handleStatusChange = (task, newStatus) => {
    onUpdate({ ...task, status: newStatus });
  };

  const handlePriorityChange = (task, newPriority) => {
    onUpdate({ ...task, priority: newPriority });
  };

  const handleDueDateChange = (task, newDueDate) => {
    onUpdate({ ...task, dueDate: newDueDate });
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (task) => {
    if (editingText.trim()) {
      onUpdate({ ...task, text: editingText.trim() });
    }
    setEditingTaskId(null);
    setEditingText('');
  };

  const handleEditKeyDown = (task, e) => {
    if (e.key === 'Enter') saveEdit(task);
    else if (e.key === 'Escape') { setEditingTaskId(null); setEditingText(''); }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, task) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === task.id) return;
  };

  const handleDrop = (e, targetTask) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.id === targetTask.id) return;
    const newOrder = [...filteredTasks];
    const draggedIndex = newOrder.findIndex(t => t.id === draggedTask.id);
    const targetIndex = newOrder.findIndex(t => t.id === targetTask.id);
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedTask);
    const reordered = newOrder.map((t, i) => ({ ...t, order: i }));
    onReorderTasks(reordered);
    setDraggedTask(null);
  };

  const handleDragEnd = () => setDraggedTask(null);

  const handleAddComment = (taskId) => {
    if (newComment.trim()) {
      onAddComment(taskId, newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const isOverdue = (task) => {
    if (!task.dueDate || task.status === 'done') return false;
    return new Date(task.dueDate) < new Date();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-stone-100 text-stone-700 border-stone-300';
      case 'in-progress': return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'done': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-stone-600 bg-stone-50';
    }
  };

  const toggleExpand = (taskId) => {
    if (!editingTaskId) setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const toggleComments = (taskId) => {
    setShowComments(showComments === taskId ? null : taskId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Tasks <span className="text-sm font-normal text-stone-500">({tasks.length})</span>
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-700 focus:outline-none">
            <option value="all">All Tasks</option>
            {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-700 focus:outline-none">
            <option value="status">Sort by Status</option>
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="order">Custom Order</option>
          </select>
        </div>
      </div>

      <div className="mb-5 p-4 bg-stone-100 rounded-xl">
        <NewTask onAdd={onAdd} />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-stone-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-stone-500">{tasks.length === 0 ? 'No tasks yet!' : 'No tasks match filter.'}</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => {
            const isExpanded = expandedTask === task.id;
            const isEditing = editingTaskId === task.id;
            const isDragging = draggedTask?.id === task.id;
            const taskComments = task.comments || [];

            return (
              <li key={task.id} draggable onDragStart={(e) => handleDragStart(e, task)} onDragOver={(e) => handleDragOver(e, task)} onDrop={(e) => handleDrop(e, task)} onDragEnd={handleDragEnd}
                className={`rounded-xl border-2 transition-all ${task.status === 'done' ? 'border-green-200 bg-green-50/50' : isExpanded ? 'border-stone-300 bg-stone-50' : isDragging ? 'border-amber-400 bg-amber-50 opacity-75' : 'border-stone-100 hover:border-stone-200 bg-white'}`}>
                <div className={`p-4 ${!isEditing ? 'cursor-pointer' : ''}`} onClick={() => { if (!isEditing) toggleExpand(task.id); }}>
                  <div className="flex flex-col md:flex-row md:items-start gap-3">
                    <div className="hidden md:block text-stone-300 cursor-grab p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" /></svg>
                    </div>
                    <div className="flex items-start gap-3 flex-1">
                      <input type="checkbox" checked={task.status === 'done'} onChange={(e) => { e.stopPropagation(); handleStatusChange(task, e.target.checked ? 'done' : 'todo'); }} className="mt-1 w-5 h-5 rounded border-stone-300 text-green-600" onClick={(e) => e.stopPropagation()} />
                      <div className="flex-1 min-w-0">
                        {isEditing ? (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} onKeyDown={(e) => handleEditKeyDown(task, e)} onBlur={() => saveEdit(task)} className="flex-1 px-3 py-1.5 border-2 border-stone-300 rounded-lg" autoFocus />
                          </div>
                        ) : (
                          <span className={`text-stone-800 font-medium ${task.status === 'done' ? 'line-through text-stone-400' : ''}`} onClick={(e) => { e.stopPropagation(); startEditing(task); }}>{task.text}</span>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(task.status)}`}>{STATUSES.find(s => s.id === task.status)?.label}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority || 'medium')}`}>{PRIORITIES.find(p => p.id === (task.priority || 'medium'))?.label}</span>
                          {task.dueDate && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isOverdue(task) ? 'text-red-600 bg-red-50' : 'text-stone-600 bg-stone-100'}`}>{formatDate(task.dueDate)}</span>}
                          {taskComments.length > 0 && <button onClick={(e) => { e.stopPropagation(); toggleComments(task.id); }} className="text-xs px-2 py-0.5 rounded-full font-medium text-blue-600 bg-blue-50">{taskComments.length} comments</button>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); toggleComments(task.id); }} className="p-2 text-stone-400 hover:text-blue-500 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.868 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg></button>
                      <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="p-2 text-stone-400 hover:text-red-500 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
                    </div>
                  </div>
                </div>
                {isExpanded && !isEditing && (
                  <div className="px-4 pb-4 pt-0 border-t border-stone-200">
                    <div className="pt-4 space-y-3">
                      <div className="text-sm"><span className="text-stone-500">Created: </span><span className="text-stone-700">{task.createdAt ? formatDate(task.createdAt) : 'Unknown'}</span></div>
                      <div><label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Status</label>
                        <div className="flex flex-wrap gap-2">{STATUSES.map(s => <button key={s.id} onClick={() => handleStatusChange(task, s.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${task.status === s.id ? (s.id === 'todo' ? 'bg-stone-600 text-white' : s.id === 'in-progress' ? 'bg-amber-600 text-white' : 'bg-green-600 text-white') : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>{s.label}</button>)}</div>
                      </div>
                      <div><label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Priority</label>
                        <div className="flex flex-wrap gap-2">{PRIORITIES.map(p => <button key={p.id} onClick={() => handlePriorityChange(task, p.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${(task.priority || 'medium') === p.id ? (p.id === 'low' ? 'bg-green-600 text-white' : p.id === 'medium' ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white') : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>{p.label}</button>)}</div>
                      </div>
                      <div><label className="block text-xs font-semibold text-stone-500 uppercase mb-2">Due Date</label><input type="date" value={task.dueDate || ''} onChange={(e) => handleDueDateChange(task, e.target.value)} className="px-3 py-2 text-sm border border-stone-200 rounded-lg w-full" /></div>
                    </div>
                  </div>
                )}
                {showComments === task.id && (
                  <div className="px-4 pb-4 pt-0 border-t border-stone-200">
                    <div className="pt-4 space-y-3">
                      <label className="block text-xs font-semibold text-stone-500 uppercase">Comments ({taskComments.length})</label>
                      <div className="flex gap-2">
                        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddComment(task.id); }} placeholder="Add a comment..." className="flex-1 px-3 py-2 text-sm border border-stone-200 rounded-lg" />
                        <button onClick={() => handleAddComment(task.id)} className="px-4 py-2 bg-stone-800 text-white rounded-lg text-sm font-medium">Add</button>
                      </div>
                      {taskComments.length > 0 && <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {taskComments.map(c => (
                          <li key={c.id} className="p-2 bg-stone-50 rounded-lg text-sm">
                            <div className="flex justify-between items-start">
                              <span className="text-stone-700">{c.text}</span>
                              <button onClick={() => onDeleteComment(task.id, c.id)} className="text-stone-400 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
                            </div>
                            <span className="text-xs text-stone-400">{formatDate(c.createdAt)} at {formatTime(c.createdAt)}</span>
                          </li>
                        ))}
                      </ul>}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
