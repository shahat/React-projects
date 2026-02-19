import { ProjectSidebar, NewProject, NoProjectSelected, SelectedProject, ThemeToggle } from './components';
import { useProject } from './context';

function App() {
  const { state, selectedProject, projectTasks, filteredProjects, filteredProjectTasks, actions, helpers } = useProject();

  // Determine which content to render
  let content;
  
  if (state.selectedProjectId === null) {
    // Adding new project
    content = (
      <NewProject 
        onAdd={actions.addProject} 
        onCancel={actions.cancelAddProject} 
      />
    );
  } else if (state.selectedProjectId === undefined) {
    // No project selected
    content = <NoProjectSelected onStartAddProject={actions.startAddProject} />;
  } else {
    // Project selected - wrap addTask to include projectId
    const handleAddTask = (taskData) => {
      actions.addTask({
        ...taskData,
        projectId: selectedProject.id,
      });
    };
    
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={filteredProjectTasks}
        stats={helpers.getProjectStats(selectedProject.id)}
        progress={helpers.getProjectProgress(selectedProject.id)}
        onDelete={() => actions.deleteProject(selectedProject.id)}
        onUpdate={actions.updateProject}
        onAddTask={handleAddTask}
        onUpdateTask={actions.updateTask}
        onDeleteTask={actions.deleteTask}
        onAddComment={actions.addComment}
        onDeleteComment={actions.deleteComment}
        onReorderTasks={actions.reorderTasks}
      />
    );
  }

  return (
    <main className="h-screen flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden bg-stone-100 dark:bg-stone-900 transition-colors">
      <ProjectSidebar
        projects={filteredProjects}
        tasks={state.tasks}
        selectedProjectId={state.selectedProjectId}
        onStartAddProject={actions.startAddProject}
        onSelectProject={actions.selectProject}
        helpers={helpers}
        searchQuery={state.searchQuery}
        onSearchChange={actions.setSearchQuery}
      />
      <div className="flex-1 overflow-y-auto">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {content}
      </div>
    </main>
  );
}

export default App;
