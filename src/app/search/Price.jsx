import React, { useState, useRef, useEffect } from "react";

const HoldDragRangeSelector = ({
  setShowPrice,
  price,
  setPrice,
  handleReset,
  showPrice,
}) => {
  const [range, setRange] = useState({ min: 0, max: 10000 }); // Default max set to 10000
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const containerRef = useRef(null);

  const maxRangeValue = 10000; // Set default max range to 10000

  useEffect(() => {
    if (!showPrice) return;
    setRange({ min: price.minPrice, max: price.maxPrice });
  }, [showPrice, price]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerLeft = container.getBoundingClientRect().left;

    const mouseX = e.clientX - containerLeft;
    const percentPosition = Math.max(
      0,
      Math.min(100, (mouseX / containerWidth) * 100)
    );
    const rangeValue = Math.round((percentPosition / 100) * maxRangeValue);

    if (isDraggingMin) {
      setRange((prev) => ({
        ...prev,
        min: Math.min(prev.max - 500, Math.max(0, rangeValue)),
      }));
    }

    if (isDraggingMax) {
      setRange((prev) => ({
        ...prev,
        max: Math.max(prev.min + 500, Math.min(maxRangeValue, rangeValue)),
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingMin, isDraggingMax]);

  const handleInputChange = (e, type) => {
    const value = Math.max(0, Math.min(maxRangeValue, Number(e.target.value)));
    setRange((prev) =>
      type === "min"
        ? { ...prev, min: Math.min(prev.max - 500, value) }
        : { ...prev, max: Math.max(prev.min + 500, value) }
    );
  };

  return (
    <div className="mt-1 w-[280px] max-w-md absolute py-4 bg-white shadow-md z-10 h-[200px] rounded-md border border-[#d1d5db]">
      <div className="text-left mb-4">
        <p className="text-[16px] text-gray-600 ml-5 font-[inter-r]">
          Selected Range: ${range.min} - ${range.max}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-[230px] h-2 bg-gray-200 rounded-full ml-5"
      >
        <div
          className="absolute h-full bg-gradient-to-r from-blue-500 to-pink-500 z-10"
          style={{
            left: `${(range.min / maxRangeValue) * 100}%`,
            width: `${((range.max - range.min) / maxRangeValue) * 100}%`,
          }}
        />

        <div
          className={`absolute w-5 h-5 rounded-full z-20 top-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow-md cursor-grab active:cursor-grabbing
            ${
              isDraggingMin
                ? "bg-pink-500 border-2 border-white"
                : "bg-white border-2 border-pink-500"
            }`}
          style={{
            left: `${(range.min / maxRangeValue) * 100}%`,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingMin(true);
          }}
        />

        <div
          className={`absolute w-5 h-5 rounded-full z-20 top-1/2 transform -translate-y-1/2 -translate-x-1/2 shadow-md cursor-grab active:cursor-grabbing
            ${
              isDraggingMax
                ? "bg-pink-500 border-2 border-white"
                : "bg-white border-2 border-pink-500"
            }`}
          style={{
            left: `${(range.max / maxRangeValue) * 100}%`,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingMax(true);
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-4 px-5">
        <div>
          <label className="text-gray-600 font-[inter-r] text-[14px]">
            Min:{" "}
          </label>
          <input
            type="number"
            value={range.min}
            onChange={(e) => handleInputChange(e, "min")}
            className="w-20 border border-gray-300 rounded-md text-center"
          />
        </div>
        <div>
          <label className="text-gray-600 font-[inter-r] text-[14px]">
            Max:{" "}
          </label>
          <input
            type="number"
            value={range.max}
            onChange={(e) => handleInputChange(e, "max")}
            className="w-20 border border-gray-300 rounded-md text-center"
          />
        </div>
      </div>

      <button
        className="bg-pink-500 text-white p-3 mt-6 rounded-md absolute right-0 mr-5 font-[inter-r]"
        onClick={() => {
          setShowPrice(false);
          setPrice({
            minPrice: range.min,
            maxPrice: range.max,
            applied: true,
          });
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default HoldDragRangeSelector;
