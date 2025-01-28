import { NewProject, NoProjectSelected, ProjectSidebar } from "./components";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    // undefined means i am doning nothing
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleStartAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        // null means i am adding new project
        selectedProjectId: null,
      };
    });
  };

  // function to cancel adding new project
  const handleCancelAddProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  };

  // function to select project
  const handleSelectProject = (id) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  };

  // function to delete project
  const handleDeleteProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  };

  // function to add new project
  const handleAddProject = (project) => {
    const newProject = {
      ...project,
      id: Math.random(),
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  // handle adding a task task should be attached to the selected project
  const handleAddTask = (text) => {
    const task = {
      text: text,
      projectId: projectsState.selectedProjectId,
      id: Math.random(),
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, task],
      };
    });
  };
  // handle deleting a task
  const handleDeleteTask = (taskId) => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    });
  };

  let progect = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  // decide wich content will be rendered
  let content = (
    <SelectedProject
      project={progect}
      onDeleteProject={handleDeleteProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      // passing the selected project tasks
      tasks={projectsState.tasks.filter(
        (task) => task.projectId === projectsState.selectedProjectId
      )}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className=" h-screen  flex flex-col  md:flex-row gap-8 ">
      <ProjectSidebar
        projects={projectsState.projects}
        onStartAddProject={handleStartAddProject}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}
export default App;
