import "./categories.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaBed, FaCar, FaCampground, FaShip } from "react-icons/fa";
import React, { useState } from "react";

const Tabs = ({ categories = [], selectedCategory, setCategory }) => {
  const [selectedTab, setSelectedTab] = useState("");
  return (
    <React.Fragment>
      <div className="flex justify-center mt-8 space-x-4 w-full max-w-md border-b-2 border-white/24  z-10 relative mb-5">
        {categories &&
          categories.length > 0 &&
          categories?.map((category) => {
            const isActive = selectedCategory === category?.slug;
            return (
              <motion.div
                key={category?.id}
                onClick={() => setCategory(category?.slug)}
                className={`cursor-pointer px-4 py-2 relative flex items-center space-x-2 ${
                  isActive ? "text-white " : "text-white"
                }`}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={"/categories/" + category?.slug + ".png"}
                    alt={category?.name}
                    className={
                      "w-[32px] h-[32px] " +
                      (isActive ? "opacity-100 " : "opacity-50")
                    }
                  />
                  <span className={isActive ? "opacity-100  " : "opacity-50"}>
                    {category.name}
                  </span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-pink-500"
                  />
                )}
                {category?.status === "Inactive" && (
                  <p className="coming-soon-text absolute top-[-30px] w-[110px]">
                    {" "}
                    Coming
                  </p>
                )}

                {selectedTab === category.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-pink-500"
                  />
                )}
              </motion.div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default Tabs;
{
  /* <ul className="filter-list-tabs">
          {categories &&
            categories.length > 0 &&
            categories?.map((category) => {
              const isActive = selectedCategory === category?.slug;
              return (
                <li
                  key={category?.id}
                  className={`filter-list-tab ${
                    isActive ? "filter-list-tab-active" : ""
                  }`}
                  onClick={() => setCategory(category?.slug)}
                >
                  <span className="filter-list-tab-icon relative">
                    <img
                      src={"/categories/" + category?.slug + ".png"}
                      alt={category?.name}
                      className={
                        "w-[32px] h-[32px] " +
                        (isActive ? "opacity-100" : "opacity-50")
                      }
                    />
                    {category?.status === "Inactive" && (
                      <p className="coming-soon-text absolute top-[-30px] w-[110px]">
                        {" "}
                        Coming
                      </p>
                    )}
                  </span>
                  <span className="font-[inter-s] text-[12px] text-[#9CA3AF]">
                    {category?.name}
                  </span>
                </li>
              );
            })}
        </ul> */
}
