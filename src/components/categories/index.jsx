import { Tabs } from "antd";
import { FaCar, FaCampground, FaShip, FaCaravan } from "react-icons/fa";
import { TbHomeSearch } from "react-icons/tb";
import { PiSailboatBold } from "react-icons/pi";
import React, { useState } from "react";
import "./categories.css";

const ChooseCategories = ({ setActiveTab }) => {
  const [activeKey, setActiveKey] = useState(null); // No tab selected initially

  const tabItems = [
    {
      key: "1",
      Icon: <TbHomeSearch size={32} />,
      label: "Stays",
    },
    {
      key: "2",
      Icon: <FaCar size={32} />,
      label: "Vehicles",
    },
    {
      key: "3",
      Icon: <FaCaravan size={32} />,
      label: "RVs",
    },
    {
      key: "4",
      Icon: <PiSailboatBold size={32} />,
      label: "Boats",
    },
  ];
  const items = tabItems.map((item) => ({
    ...item,
    label: (
      <div className="flex flex-col items-center font-medium text-sm justify-center gap-3">
        {item.Icon}
        <span className="text-base">{item.label}</span>
      </div>
    ),
  }));

  const onChange = (key) => {
    setActiveKey(key); // Update the active tab key
    setActiveTab(true); // Call the parent handler
  };

  return (
    <div className="pb-4">
      <h3 className="text-xl font-medium py-3">Choose a Category</h3>
      <Tabs
        items={items}
        activeKey={activeKey}
        onChange={onChange}
        className="custom-tabs"
      />
    </div>
  );
};

export default ChooseCategories;
