import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterMode, setFilterMode] = useState("All");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, isComplete: false },
      ]);
      setNewTask("");
    }
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterMode === "All") return true;
    if (filterMode === "Active") return !task.isComplete;
    if (filterMode === "Complete") return task.isComplete;
    return true;
  });

  return (
    <div>
      <h1>Todo App</h1>
      <div className="navbar">
        <button className="options" onClick={() => setFilterMode("All")}>
          All
        </button>
        <button className="options" onClick={() => setFilterMode("Active")}>
          Active
        </button>
        <button className="options" onClick={() => setFilterMode("Complete")}>
          Complete
        </button>
      </div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="input"
        placeholder="Enter a new task..."
      />
      <button className="add" onClick={handleAddTask}>
        Add Task
      </button>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isComplete}
              onChange={() => handleCompleteTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button className="delete" onClick={handleDeleteAllTasks}>
        Delete All Tasks
      </button>
    </div>
  );
};

export default TodoApp;
