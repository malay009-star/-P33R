import { Tabs } from "antd";
import { FaBed, FaCar, FaCampground, FaShip } from "react-icons/fa";
import React, { useState } from "react";
import "./categories.css";

const ChooseCategories = ({ setActiveTab }) => {
  const [activeKey, setActiveKey] = useState(null); // No tab selected initially

  const tabItems = [
    {
      key: "1",
      icon: <FaBed size={24} />,
      label: "Stays",
    },
    {
      key: "2",
      icon: <FaCar size={24} />,
      label: "Vehicles",
    },
    {
      key: "3",
      icon: <FaCampground size={24} />,
      label: "RVs",
    },
    {
      key: "4",
      icon: <FaShip size={24} />,
      label: "Boats",
    },
  ];

  const items = tabItems.map((item) => ({
    ...item,
    label: (
      <div className="custom-tab-label">
        <span>{item.label}</span>
      </div>
    ),
  }));

  const onChange = (key) => {
    setActiveKey(key); // Update the active tab key
    setActiveTab(true); // Call the parent handler
  };

  return (
    <div className="pb-4">
      <h3 className="text-lg font-medium py-3">Choose a Category</h3>
      <Tabs
        items={items}
        activeKey={activeKey} // Bind the activeKey state
        onChange={onChange}
        className="custom-tabs"
      />
    </div>
  );
};

export default ChooseCategories;
