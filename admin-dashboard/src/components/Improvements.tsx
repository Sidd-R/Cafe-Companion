import React, { useState } from "react";

const Improvements = () => {
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      selected: false,
    },
    {
      id: 2,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      selected: false,
    },
    {
      id: 3,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      selected: false,
    },
    // Add more items as needed
  ]);

  const handleCheckboxChange = (id: number) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleResolvedClick = () => {
    setChecklist((prevChecklist) =>
      prevChecklist.filter((item) => !item.selected)
    );
  };

  return (
    <div className="p-4 rounded-md bg-white border border-gray-300 shadow-lg min-h-[500px] min-w-[350px] max-w-[400px] overflow-auto flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Improvements Checklist
        </h2>
        <ul className="space-y-2">
          {checklist.map((item) => (
            <li key={item.id} className="flex items-center">
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={item.selected}
                onChange={() => handleCheckboxChange(item.id)}
                style={{ width: "30px", height: "30px" }}
                className="mr-4"
              />
              <label
                htmlFor={`item-${item.id}`}
                className={item.selected ? "line-through text-gray-500" : ""}
              >
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleResolvedClick}
        disabled={checklist.every((item) => !item.selected)}
      >
        Resolve Selected
      </button>
    </div>
  );
};

export default Improvements;
