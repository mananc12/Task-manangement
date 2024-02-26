// TaskForm.js

import React, { useState } from "react";

const TaskForm = ({ addNewTask }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    try {
      if (newTask.title.trim() === "") {
        setTitleError("Title cannot be empty");
        setTimeout(() => {
          setTitleError(""); // Clear any previous errors
        }, 1000);
        return;
      } else if (newTask.description.trim() === "") {
        setDescError("Description cannot be empty"); // Fix the error message here
        setTimeout(() => {
          setDescError(""); // Clear any previous errors
        }, 1000);
        return;
      }
      addNewTask(newTask);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="input-container">
      <div>
        <input
          type="text"
          placeholder="Task title"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        {titleError && <p className="error-message">{titleError}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Task description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        {descError && <p className="error-message">{descError}</p>}
      </div>
      <button className="add-button" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;
