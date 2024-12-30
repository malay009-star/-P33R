import React, { useState } from "react";

const VehicleSelector = () => {
  const [selectedVehicles, setSelectedVehicles] = useState(new Set());

  const vehicles = [
    {
      id: "class-a",
      title: "Class A",
      description: "Looks and drives like a bus and is ideal for 4-8 people.",
    },
    {
      id: "class-b",
      title: "Class B",
      description: "Looks and drives like a van and is ideal for 1-3 people.",
    },
    {
      id: "class-c",
      title: "Class C",
      description:
        "Drives like a large truck and has a bunk over the cab. Ideal for 4-8 people.",
    },
    {
      id: "truck-camper",
      title: "Truck Camper",
      description:
        "Rests in the bed of a heavy-duty truck. Ideal for 2-4 people.",
    },
    {
      id: "campervan",
      title: "Campervan",
      description: "Looks and drives like a van and is ideal for 1-3 people.",
    },
  ];

  const toggleVehicle = (id) => {
    const newSelected = new Set(selectedVehicles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedVehicles(newSelected);
  };

  const selectAll = () => {
    setSelectedVehicles(new Set(vehicles.map((v) => v.id)));
  };

  const clearAll = () => {
    setSelectedVehicles(new Set());
  };

  return (
    <div className="drivable max-w-2xl mx-auto p-4 bg-white rounded-lg shadow absolute top-12 w-[664px] z-10">
      <div className="mb-4">
        <label className="flex items-center space-x-2 text-gray-700 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300"
            checked={selectedVehicles.size === vehicles.length}
            onChange={selectAll}
          />
          <span>Select all drivables</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="border border-gray-200 rounded p-4 hover:border-gray-300"
          >
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded border-gray-300"
                checked={selectedVehicles.has(vehicle.id)}
                onChange={() => toggleVehicle(vehicle.id)}
              />
              <div>
                <div className="font-medium text-gray-900">{vehicle.title}</div>
                <div className="text-sm text-gray-500">
                  {vehicle.description}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={clearAll}
          className="text-gray-600 hover:text-gray-800"
        >
          Clear all
        </button>
        <button
          onClick={() => console.log("Applied:", Array.from(selectedVehicles))}
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default VehicleSelector;
