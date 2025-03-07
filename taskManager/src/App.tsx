import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import DarkModeButton from "./components/DarkMode";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function App() {
  // Taking tasks from Local Storage
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length) || 0;

  //  when tasks change update the local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // goal adding form
  function addTask(task) {
    const newTask = {
      id: `todo-${nanoid()}`,
      name: task.name,
      date: task.date,
      time: task.time,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  // Edit goal
  function editTask(id, newName) {
    const editedTasksList = tasks.map((task) =>
      id === task.id ? { ...task, name: newName } : task
    );
    setTasks(editedTasksList);
  }

  // Signs Completed Goal
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) =>
      id === task.id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  // Deleting Task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Filters Objects
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  // Filter Buttons 
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Lists Tasks By Filter
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      date={task.date}
      time={task.time}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
    // Shows Total Lenght of the items on the scene
  const headingText = `${taskList.length} task${taskList.length !== 1 ? "s" : ""} remaining`;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="
  text-6xl md:text-8xl lg:text-4xl font-extrabold 
  text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-blue-500 to-purple-500 
  animate-pulse tracking-wide uppercase text-center 
  shadow-2xl drop-shadow-2xl
  transform hover:scale-110 transition-all duration-500 ease-in-out 
  relative
  before:absolute before:content-['🚀'] before:-top-10 before:-left-10 before:text-7xl before:animate-spin
  after:absolute after:content-['🔥'] after:-bottom-10 after:-right-10 after:text-7xl after:animate-bounce
">
  ⚡ To DO Matic ⚡
</h1>
      
      <Form addTask={addTask} />
      <div className="flex justify-center gap-2 my-4">{filterList}</div>
      <h2 id="list-heading" className="text-lg font-semibold text-gray-700" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul className="mt-4">{taskList}</ul>
    </div>
  );
}

export default App;
