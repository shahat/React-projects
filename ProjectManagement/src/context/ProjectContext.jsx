import { createContext, useContext, useReducer, useEffect } from 'react';

const ProjectContext = createContext();

const STORAGE_KEY = 'project_management_data';

// Load initial state from localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return null;
};

// Initial state
const initialState = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  theme: 'light',
  searchQuery: '',
};

// Action types
const ACTIONS = {
  SET_STATE: 'SET_STATE',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  SELECT_PROJECT: 'SELECT_PROJECT',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  CLEAR_SELECTED: 'CLEAR_SELECTED',
  SET_THEME: 'SET_THEME',
  SET_SEARCH: 'SET_SEARCH',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  REORDER_TASKS: 'REORDER_TASKS',
  REORDER_PROJECTS: 'REORDER_PROJECTS',
};

// Reducer function
const projectReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...state, ...action.payload };

    case ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        selectedProjectId: undefined,
      };

    case ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    case ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter((p) => p.id !== action.payload),
        tasks: state.tasks.filter((t) => t.projectId !== action.payload),
      };

    case ACTIONS.SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload,
      };

    case ACTIONS.CLEAR_SELECTED:
      return {
        ...state,
        selectedProjectId: action.payload === 'add' ? null : undefined,
      };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case ACTIONS.ADD_COMMENT:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? { ...t, comments: [...(t.comments || []), action.payload.comment] }
            : t
        ),
      };

    case ACTIONS.DELETE_COMMENT:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                comments: (t.comments || []).filter(
                  (c) => c.id !== action.payload.commentId
                ),
              }
            : t
        ),
      };

    case ACTIONS.REORDER_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case ACTIONS.REORDER_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    default:
      return state;
  }
};

// Provider component
export function ProjectProvider({ children }) {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      dispatch({ type: ACTIONS.SET_STATE, payload: stored });
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [state]);

  // Apply theme
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Actions
  const startAddProject = () => {
    dispatch({ type: ACTIONS.CLEAR_SELECTED, payload: 'add' });
  };

  const cancelAddProject = () => {
    dispatch({ type: ACTIONS.CLEAR_SELECTED, payload: 'cancel' });
  };

  const selectProject = (id) => {
    dispatch({ type: ACTIONS.SELECT_PROJECT, payload: id });
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'active',
      order: state.projects.length,
    };
    dispatch({ type: ACTIONS.ADD_PROJECT, payload: newProject });
  };

  const updateProject = (project) => {
    dispatch({ type: ACTIONS.UPDATE_PROJECT, payload: project });
  };

  const deleteProject = (id) => {
    dispatch({ type: ACTIONS.DELETE_PROJECT, payload: id });
  };

  const addTask = (task) => {
    const projectTasks = state.tasks.filter((t) => t.projectId === task.projectId);
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      status: 'todo',
      priority: task.priority || 'medium',
      createdAt: new Date().toISOString(),
      order: projectTasks.length,
      comments: [],
    };
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
  };

  const updateTask = (task) => {
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: task });
  };

  const deleteTask = (id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  };

  const toggleTheme = () => {
    dispatch({ type: ACTIONS.SET_THEME, payload: state.theme === 'light' ? 'dark' : 'light' });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH, payload: query });
  };

  const addComment = (taskId, text) => {
    const comment = {
      id: crypto.randomUUID(),
      text,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: ACTIONS.ADD_COMMENT, payload: { taskId, comment } });
  };

  const deleteComment = (taskId, commentId) => {
    dispatch({ type: ACTIONS.DELETE_COMMENT, payload: { taskId, commentId } });
  };

  const reorderTasks = (reorderedTasks) => {
    dispatch({ type: ACTIONS.REORDER_TASKS, payload: reorderedTasks });
  };

  const reorderProjects = (reorderedProjects) => {
    dispatch({ type: ACTIONS.REORDER_PROJECTS, payload: reorderedProjects });
  };

  // Computed values
  const selectedProject = state.projects.find(
    (p) => p.id === state.selectedProjectId
  );

  const projectTasks = state.tasks.filter(
    (t) => t.projectId === state.selectedProjectId
  );

  // Filter projects based on search
  const filteredProjects = state.projects.filter((p) =>
    p.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  // Filter tasks based on search
  const filteredProjectTasks = projectTasks.filter((t) =>
    t.text.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  const getProjectProgress = (projectId) => {
    const tasks = state.tasks.filter((t) => t.projectId === projectId);
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter((t) => t.status === 'done').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const getProjectStats = (projectId) => {
    const tasks = state.tasks.filter((t) => t.projectId === projectId);
    return {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      done: tasks.filter((t) => t.status === 'done').length,
    };
  };

  const value = {
    state,
    selectedProject,
    projectTasks,
    filteredProjects,
    filteredProjectTasks,
    actions: {
      startAddProject,
      cancelAddProject,
      selectProject,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      toggleTheme,
      setSearchQuery,
      addComment,
      deleteComment,
      reorderTasks,
      reorderProjects,
    },
    helpers: {
      getProjectProgress,
      getProjectStats,
    },
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

// Custom hook
export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
