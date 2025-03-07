import { useRef, useState, useEffect } from "react";

function Todo(props) {
  //  State Defining (editing situation, New Name, new date ande time)
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);
  const [newTime, setNewTime] = useState(props.time);
  const [newDate, setNewDate] = useState(props.date);

  //  Refs (Edit input and edit button)
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  //  when input area changed update state
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "text") setNewName(value);
    if (name === "date") setNewDate(value);
    if (name === "time") setNewTime(value);
  }

  //  when task edit form happens this function happens
  function handleSubmit(e) {
    e.preventDefault(); // ignores to refresh

    // if title is empty back to alert : "Task name cannot be empty!"
    if (newName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }

    //  Sends news vars to App.txs's addTask
    props.editTask(props.id, newName.trim(), newDate, newTime);

    // Close editing
    setEditing(false);
  }

  // when log to edit part get focus
  useEffect(() => {
    if (isEditing) editFieldRef.current?.focus();
    else editButtonRef.current?.focus();
  }, [isEditing]);

  // Editing Template
  const editingTemplate = (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 bg-gray-100 rounded-lg shadow-md"
    >
      {/* New task name */}
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none w-full"
        name="text"
        value={newName}
        onChange={handleChange}
        ref={editFieldRef}
      />

      {/* New task date */}
      <input
        type="date"
        className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        name="date"
        value={newDate}
        onChange={handleChange}
      />

      {/* New task time */}
      <input
        type="time"
        className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        name="time"
        value={newTime}
        onChange={handleChange}
      />

      {/* Save and Delete Buttons */}
      <div className="flex justify-end gap-2 mt-2">
        <button 
          type="button" 
          onClick={() => setEditing(false)} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </form>
  );

  // Show mode of template
  const viewTemplate = (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
      <div>
        {/* Task Complete Check Box */}
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded"
        />
        {/* Task Infos (Adı, tarihi ve saati) */}
        <span 
          className={`ml-2 text-lg ${props.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {props.name} ({props.date} - {props.time})
        </span>
      </div>

      {/* Edit and Delete  */}
      <div className="flex gap-2">
        <button 
          type="button" 
          onClick={() => setEditing(true)} 
          ref={editButtonRef} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button 
          type="button" 
          onClick={() => props.deleteTask(props.id)} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );

  // if user edits open editing templete else dont show
  return <li className="my-3">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
