import React, { useState } from "react";

function NewTask({ onAdd }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [error, setError] = useState(false);

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  const handleAddTask = () => {
    if (enteredTask.trim() === "") {
      setError(true);
      return;
    }
    onAdd(enteredTask);
    setEnteredTask("");
    setError(false);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          value={enteredTask}
          onChange={handleChange}
        />
        <button
          className="text-stone-700 hover:stone-950"
          onClick={handleAddTask}
        >
          add task{" "}
        </button>
      </div>
      {error && (
        <small className="text-red-500 text-sm"> Please enter a task </small>
      )}
    </section>
  );
}

export default NewTask;
