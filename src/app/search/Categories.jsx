import React, { useState } from "react";
import { FaShip } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import "./search.css";
import {
  IconBoat,
  IconHome,
  IconCar,
  Recreation,
  Clothing,
  Equipment,
  Spaces,
} from "./svg/Svg";
const categories = [
  { name: "Boats", icon: <IconBoat />, isComingSoon: false },
  { name: "Lodging", icon: <IconHome />, isComingSoon: false },
  { name: "Vehicles", icon: <IconCar />, isComingSoon: false },
  { name: "Recreational Vehicles", icon: <Recreation />, isComingSoon: false },
  { name: "Clothing", icon: <Clothing />, isComingSoon: true },
  { name: "Equipment", icon: <Equipment />, isComingSoon: true },
  { name: "Cool Spaces & Furnishings", icon: <Spaces />, isComingSoon: true },
];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="filter-list-tabs-container">
      <ul className="filter-list-tabs">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`filter-list-tab ${
              activeTab === index ? "filter-list-tab-active" : ""
            }`}
            onClick={() => handleTabClick(index)}
          >
            <span className="filter-list-tab-icon relative">
              {category.icon}
              {category.isComingSoon && (
                <p className="coming-soon-text absolute top-[-30px] w-[110px]">
                  {" "}
                  Coming
                </p>
              )}
            </span>
            <span className="font-[inter-s] text-[12px] text-[#9CA3AF]">
              {category.name}
            </span>
          </li>
        ))}
      </ul>
      {/* Tab content goes here */}
      {/* <div className="filter-list-content">
        <p>Content for {categories[activeTab].name}</p>
      </div> */}
    </div>
  );
};

export default Tabs;
