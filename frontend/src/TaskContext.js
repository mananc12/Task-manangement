import React, { createContext, useReducer, useContext } from "react";

// Initial state for tasks
const initialState = {
  tasks: [],
};

// Action types
const ADD_TASK = "ADD_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext();

// Create a context provider component
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = (task) => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  const updateTask = (task) => {
    dispatch({ type: UPDATE_TASK, payload: task });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: DELETE_TASK, payload: taskId });
  };

  return (
    <TaskContext.Provider
      value={{ tasks: state.tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Create a custom hook to use the context
const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export { TaskProvider, useTaskContext };
