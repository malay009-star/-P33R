import React, { useState } from "react";
import { ChevronUp, X } from "lucide-react";

import Price from "./Price";

const FilterBar = ({ price, setPrice }) => {
  const handleReset = () => {
    setPrice({
      minPrice: 0,
      maxPrice: 200,
      applied: false,
    });
  };
  const [showPrice, setShowPrice] = useState(false);
  const HandlePrice = () => {
    setShowPrice(!showPrice);
  };

  return (
    <div className="advance-filter flex flex-wrap gap-2 items-center py-4  pl-0">
      {/* Price Input */}
      <div className="relative flex items-left flex-col-reverse w-[300px]">
        <div
          className={`transition-all duration-500 ease-linear ${
            showPrice ? " max-h-[500px]" : " max-h-0"
          } `}
        >
          {showPrice && (
            <Price
              setShowPrice={setShowPrice}
              price={price}
              setPrice={setPrice}
              handleReset={handleReset}
              showPrice={showPrice}
            />
          )}
        </div>
        <div
          onClick={HandlePrice}
          className=" flex items-center justify-between w-[150px] px-4 py-2 bg-white border border-gray-300 rounded-md hover:border-gray-400"
        >
          <span className="text-gray-700 text-[inter-r]">
            {price.applied
              ? `${price?.minPrice} - ${price?.maxPrice}`
              : "Price Range"}
          </span>
          <button
            onClick={() => setShowPrice(!showPrice)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronUp
              className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ease-in-out ${
                showPrice ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {/* <button
        onClick={handleReset}
        className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        <span>Reset</span>
        <X className="w-4 h-4 ml-1" />
      </button> */}
    </div>
  );
};

export default FilterBar;
