import React, { useState } from "react";

const TowableSelector = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Split towables into left and right arrays
  const leftTowables = [
    {
      id: "fifth-wheel",
      title: "Fifth Wheel",
      description:
        "The largest towable. Mounts to a hitch inside a truck bed. Ideal for 4-8 people.",
    },
    {
      id: "tent-trailer",
      title: "Tent Trailer",
      description:
        "Collapsible top that folds down for towing. Ideal for 2-8 people.",
    },
    {
      id: "toy-hauler",
      title: "Toy Hauler",
      description: "Trailer with a living space. Ideal for 2-8 people.",
    },
  ];

  const rightTowables = [
    {
      id: "travel-trailer",
      title: "Travel Trailer",
      description:
        "A midsize living space pulled behind a suitable tow vehicle. Ideal for 4-8 people.",
    },
    {
      id: "hybrid",
      title: "Hybrid",
      description:
        "Trailer with foldable components. Easy to tow. Ideal for 2-8 people.",
    },
    {
      id: "micro-trailer",
      title: "Micro Trailer",
      description:
        "A tiny bed on wheels. Some include a kitchen and/or wet bath. 1-2 people.",
    },
  ];

  const allTowables = [...leftTowables, ...rightTowables];

  const toggleSelectAll = () => {
    if (selectedItems.length === allTowables.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allTowables.map((item) => item.id));
    }
  };

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const clearAll = () => {
    setSelectedItems([]);
  };

  const TowableColumn = ({ towables }) => (
    <div className="flex-1 space-y-4">
      {towables.map((towable) => (
        <div
          key={towable.id}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <label className="flex items-start space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 mt-1 rounded border-gray-300"
              checked={selectedItems.includes(towable.id)}
              onChange={() => toggleItem(towable.id)}
            />
            <div>
              <h3 className="font-medium text-gray-900">{towable.title}</h3>
              <p className="text-sm text-gray-500">{towable.description}</p>
            </div>
          </label>
        </div>
      ))}
    </div>
  );

  return (
    // max-w-6xl
    <div className=" mx-auto p-4 absolute top-12 w-[664px] h-[530px] bg-white z-10 border rounded-[16px] towable">
      {/* Select All Checkbox */}
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300"
            checked={selectedItems.length === allTowables.length}
            onChange={toggleSelectAll}
          />
          <span className="text-gray-700">Select all towables</span>
        </label>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 mb-6">
        <TowableColumn towables={leftTowables} />
        <TowableColumn towables={rightTowables} />
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={clearAll}
          className="text-gray-600 underline hover:text-gray-800"
        >
          Clear all
        </button>
        <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
};

export default TowableSelector;
