import { useState } from "react";

function Form(props) {
  //  Definging States 
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Change handler
  function handleChange(event) {
    const { name, value } = event.target;

    //handling to state which input was changed
    if (name === "text") setName(value);
    if (name === "date") setDate(value);
    if (name === "time") setTime(value);
  }

  // when form called 
  function handleSubmit(event) {
    event.preventDefault(); // ignors to refresh the page

    // if title is empty back to alert : "Task name cannot be empty!"
    if (name.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }

    // Sends news vars to App.txs's addTask
    props.addTask({
      name: name.trim(), // clear spaces
      date,
      time,
    });

    // clear the form and set empty
    setName("");
    setDate("");
    setTime("");
  }

  // when user pushes the enter this function will call
  function handleKeyDown(event) {
    // if input text are is empty back to alert
    if (event.key === "Enter" && name.trim() === "") {
      event.preventDefault(); // ignores the refresh page
      alert("Task name cannot be empty!");
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-gray-100 p-6 rounded-lg shadow-md"
    >
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        What needs to be done? & When?
      </h2>
      
      {/* Input Parts (Task Name, Date, Time) */}
      <div className="flex flex-col gap-3">
        {/* Task Title (Text Input) */}
        <input
          type="text"
          id="new-todo-input"
          className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          name="text"
          placeholder="Task Name"
          autoComplete="off"
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Enter Button controler
        />

        {/*  (Date Input) */}
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          name="date"
          value={date}
          onChange={handleChange}
        />

        {/*  (Time Input) */}
        <input
          type="time"
          className="border border-gray-300 p-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
          name="time"
          value={time}
          onChange={handleChange}
        />
      </div>

      {/* Adding the tasks */}
      <button 
        type="submit" 
        className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Add Task
      </button>
    </form>
  );
}

export default Form;
