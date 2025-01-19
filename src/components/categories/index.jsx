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
      Icon: (
        <svg
          width="41"
          height="41"
          viewBox="0 0 37 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.8183 31.5072H5.05664V21.7764C5.05664 18.5942 7.63622 16.0146 10.8183 16.0146H24.2623C27.4445 16.0146 30.024 18.5942 30.024 21.7764V31.5072M14.6595 31.5072H31.9446V33.4278"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.4209 31.5079V19.8564H26.1826V31.5079M24.262 25.6182H26.1826M8.89746 19.8564H16.5797V25.6182H8.89746V19.8564Z"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.7389 33.429C13.7996 33.429 14.6595 32.5692 14.6595 31.5085C14.6595 30.4478 13.7996 29.5879 12.7389 29.5879C11.6782 29.5879 10.8184 30.4478 10.8184 31.5085C10.8184 32.5692 11.6782 33.429 12.7389 33.429Z"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.5 6.41243C20.6214 6.41243 22.3411 4.69269 22.3411 2.57129M22.3411 2.57129V16.0153M22.3411 2.57129C22.3411 4.69269 24.0609 6.41243 26.1823 6.41243"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.501 12.1741C20.6223 12.1741 22.3421 10.4544 22.3421 8.333C22.3421 10.4544 24.0618 12.1741 26.1832 12.1741M6.97754 6.41243C9.09894 6.41243 10.8187 4.69269 10.8187 2.57129M10.8187 2.57129V16.0153M10.8187 2.57129C10.8187 4.69269 12.5384 6.41243 14.6598 6.41243"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.97754 12.1741C9.09894 12.1741 10.8187 10.4544 10.8187 8.33301C10.8187 10.4544 12.5384 12.1741 14.6598 12.1741"
            stroke="#9CA3AF"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
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
    setActiveKey(key);
    setActiveTab(true);
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
