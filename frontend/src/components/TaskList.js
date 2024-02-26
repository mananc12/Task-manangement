import React from "react";

const TaskList = ({ tasks, handleUpdateTaskStatus, handleDeleteTask }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task.id}>
        <span className="title">{task.title}</span>
        <span className="desc">{task.description}</span>
        <div>
          <button
            onClick={() => handleUpdateTaskStatus(task.id, !task.completed)}
          >
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

export default TaskList;
