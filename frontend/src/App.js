import React, { useEffect } from "react";
import axios from "axios";
import { useTaskContext } from "./TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

// const API_BASE_URL = "http://localhost:5000/api/tasks";
const API_BASE_URL = "https://task-manangement.vercel.app/";
function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        console.log("API response:", response.data);
        response.data.tasks.forEach(addTask);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdateTaskStatus = (id, completed) => {
    axios
      .patch(`${API_BASE_URL}/${id}`, { completed })
      .then(() =>
        updateTask({ ...tasks.find((task) => task.id === id), completed })
      )
      .catch((error) => console.error(error));
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`${API_BASE_URL}/${id}`)
      .then(() => deleteTask(id))
      .catch((error) => console.error(error));
  };

  const addNewTask = (newTask) => {
    axios
      .post(API_BASE_URL, newTask)
      .then((response) => addTask(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskList
        tasks={tasks}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
      />
      <TaskForm addNewTask={addNewTask} />
    </div>
  );
}

export default App;
