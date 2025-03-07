function FilterButton({ name, isPressed, setFilter }) {
    return (
        
      <button
        type="button"
        className={`px-4 py-2 rounded-lg font-medium transition 
        ${isPressed ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        onClick={() => setFilter(name)}
        aria-pressed={isPressed}
      >
        {name}
      </button>
    );
  }
  
  export default FilterButton;
  