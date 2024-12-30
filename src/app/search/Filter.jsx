import React, { useState, useCallback } from "react";

const DualRangeSlider = ({ min, max, value, onChange, label, unit = "$" }) => {
  const [isDragging, setIsDragging] = useState(null);

  const getPercentage = useCallback(
    (value) => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const handleMouseDown = (index) => {
    setIsDragging(index);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging === null) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const percentage = Math.min(
        Math.max(0, (e.clientX - rect.left) / rect.width),
        1
      );
      const newValue = Math.round(percentage * (max - min) + min);

      const newValues = [...value];
      newValues[isDragging] = newValue;

      // Ensure values don't cross each other
      if (isDragging === 0 && newValue < value[1]) {
        onChange(newValues);
      } else if (isDragging === 1 && newValue > value[0]) {
        onChange(newValues);
      }
    },
    [isDragging, min, max, value, onChange]
  );

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  React.useEffect(() => {
    if (isDragging !== null) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  return (
    <div className="mb-6">
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            {unit}
            {value[0]}
          </span>
          <div
            className="relative w-full h-2 bg-pink-100 rounded-lg"
            onMouseDown={(e) => handleMouseMove(e)}
          >
            {/* Track between handles */}
            <div
              className="absolute h-full bg-pink-600 rounded-lg"
              style={{
                left: `${getPercentage(value[0])}%`,
                right: `${100 - getPercentage(value[1])}%`,
              }}
            />

            {/* Left handle */}
            <div
              className="absolute w-4 h-4 bg-white border-2 border-pink-600 rounded-full cursor-pointer -mt-1"
              style={{ left: `${getPercentage(value[0])}%` }}
              onMouseDown={() => handleMouseDown(0)}
            />

            {/* Right handle */}
            <div
              className="absolute w-4 h-4 bg-white border-2 border-pink-600 rounded-full cursor-pointer -mt-1"
              style={{ left: `${getPercentage(value[1])}%` }}
              onMouseDown={() => handleMouseDown(1)}
            />
          </div>
          <span className="text-sm">
            {unit}
            {value[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

const FiltersPanel = ({ setShowFilter }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [weight, setWeight] = useState([0, 20000]);
  const [length, setLength] = useState([0, 50]);
  const [rvYear, setRvYear] = useState([2004, 2025]);

  return (
    <div className=" bg-white p-4 rounded-lg shadow absolute top-12 w-[440px] z-10 filter">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowFilter(false)}
        >
          ×
        </button>
      </div>

      {/* Temperature */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Temperature</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Air conditioner</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Heater</span>
          </label>
        </div>
      </div>

      {/* Kitchen */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Kitchen</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Refrigerator</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Stove range</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Microwave</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Kitchen sink</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Dining table</span>
          </label>
        </div>
      </div>

      {/* Bathroom */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Bathroom</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Inside shower</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Outside shower</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Toilet</span>
          </label>
        </div>
      </div>

      {/* Other */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Other</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Superhost</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Family friendly</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Pet Friendly</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Airport Pickup</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Include RV cottage</span>
          </label>
        </div>
      </div>

      {/* Rules */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Rules</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked />
            <span className="text-sm">Festival and events friendly</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Experience not required</span>
          </label>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t">
        <button className="text-blue-500 hover:text-blue-700">Clear all</button>
        <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
          Apply
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;
