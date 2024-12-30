import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const VehicleDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All Vehicle");

  const options = [
    "All Vehicle",
    "Cargo Vans",
    "Box Trucks",
    "Pickup Trucks",
    "Cars & SUVs",
    "Trailers & Misc",
    "Drivable",
    "Towable",
    "Destination Delivery",
  ];

  return (
    //   <button
    //     onClick={() => setIsOpen(!isOpen)}
    //     className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
    //   >
    //     <span className="text-gray-700">{selected}</span>
    //     <ChevronDown
    //       className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
    //         isOpen ? "transform rotate-180" : ""
    //       }`}
    //     />
    //   </button>

    <div className="absolute z-10 top-12 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-64 vehicle">
      <ul className="py-1">
        {options.map((option) => (
          <li
            key={option}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleDropdown;
