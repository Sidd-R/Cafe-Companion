import React, { useState } from "react";

const Improvements = () => {
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      text: "Be more careful when serving coffee to customers.",
      selected: false,
    },
    {
      id: 2,
      text: "Make sure the orders are correct",
      selected: false,
    },
    {
      id: 3,
      text: "Make sure the Vietnamese coffee tastes like a Vietnamese coffee!",
      selected: false,
    },
    {
      id: 4,
      text: "Make sure the Vietnamese coffee tastes like a Vietnamese coffee!",
      selected: false,
    },
    {
      id: 5,
      text: "Make sure the food is fresh and hot, and the portions are generous",
      selected: false,
    },
    {
      id: 6,
      text: "Increase the size of the sandwich and keema pav",
      selected: false,
    },{
      id: 7,
      text: "Make sure the mocha is made according to the customer's specifications.",
      selected: false,
    }
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
    <div className="p-4 rounded-md bg-white border border-gray-300 shadow-lg max-h-[500px] min-w-[350px] max-w-[400px] overflow-auto flex flex-col justify-between">
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
                style={{ width: "10px", height: "10px" }}
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
