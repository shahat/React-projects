import React from "react";
import Button from "./Button";
function ProjectSidebar({
  projects,
  onStartAddProject,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-full  md:min-w-[260px] md:max-w-[300px] px-4 md:px-10 py-10 md:py-16 bg-stone-900 text-stone-50  md:rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        {" "}
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ add project</Button>
      </div>
      <ul className="mt-8">
        {projects &&
          projects.map((project) => {
            let cssClasses =
              "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
            if (project.id === selectedProjectId) {
              cssClasses += " bg-stone-800 text-stone-200";
            } else {
              cssClasses += " text-stone-400";
            }
            return (
              <li key={project.id}>
                <button
                  onClick={() => onSelectProject(project.id)}
                  className={cssClasses}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
export default ProjectSidebar;
