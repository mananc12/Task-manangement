import React, { useEffect } from "react";

//using axios to communicate with backend
import axios from "axios";

import { useTaskContext } from "./TaskContext";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const API_BASE_URL = "http://localhost:5000/api/tasks";
function App() {

  //state management
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();

  //GET request to get the data from backend
  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => {
        console.log("API response:", response.data);
        response.data.tasks.forEach(addTask);
      })
      .catch((error) => console.error(error));
  }, []);

  //PATCH request for the modification
  const handleUpdateTaskStatus = (id, completed) => {
    axios
      .patch(`${API_BASE_URL}/${id}`, { completed })
      .then(() =>
        updateTask({ ...tasks.find((task) => task.id === id), completed })
      )
      .catch((error) => console.error(error));
  };

  //DELETE request for deleting the task
  const handleDeleteTask = (id) => {
    axios
      .delete(`${API_BASE_URL}/${id}`)
      .then(() => deleteTask(id))
      .catch((error) => console.error(error));
  };

//POST request to add a new task
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
