import React from "react";
import noProject from "../assets/no-projects.png";
import Button from "./Button";
function NoProjectSelected({ onStartAddProject }) {
  return (
    <div className="mt-10 md:mt-24 flex-1 text-center">
      <img
        src={noProject}
        alt="no project img"
        className="size-16 mx-auto object-contain"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new project</Button>
      </p>
    </div>
  );
}

export default NoProjectSelected;
