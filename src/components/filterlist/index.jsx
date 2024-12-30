import "react-datepicker/dist/react-datepicker.css";
import "./filter.css";

import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useJsApiLoader } from "@react-google-maps/api";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { PiSquaresFour } from "react-icons/pi";
import moment from "moment";

import React, { useEffect, useRef, useState } from "react";

const libraries = ["places"];

const FilterList = ({
  startDate,
  endDate,
  query,
  setLocation,
  setAddress,
  setStartDate,
  setEndDate,
  setQuery,
  handleSearch,
  address,
  isAbsolute = false,
  isSearch = false,
}) => {
  const placeAutoComplete = useRef(null);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSingleDay, setIsSingleDay] = useState(!endDate);
  const [isApplyEnabled, setIsApplyEnabled] = useState(false);

  const [autoComplete, setAutoComplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_URL,
    libraries: libraries,
  });

  useEffect(() => {
    if (!isLoaded) return;

    const gAutoComplete = new window.google.maps.places.Autocomplete(
      placeAutoComplete.current,
      {
        types: ["geocode"],
        fields: ["address_components", "formatted_address", "geometry", "name"],
        componentRestrictions: { country: "us" },
      }
    );
    setAutoComplete(gAutoComplete);
  }, [isLoaded]);

  useEffect(() => {
    if (!autoComplete) return;
    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      const position = place.geometry.location;

      if (position) {
        const latitude = position.lat();
        const longitude = position.lng();
        setLocation({ latitude, longitude });
      }

      setAddress(place?.formatted_address);
    });
  }, [autoComplete]);

  const handleDateChange = (dates) => {
    if (isSingleDay) {
      setStartDate(dates);
      setIsApplyEnabled(!!dates);
    } else {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      setIsApplyEnabled(!!start && !!end);
    }
  };

  const handleTabClick = (isSingle) => {
    setIsSingleDay(isSingle);
    setIsDateOpen(true);
    if (isSingle) {
      setEndDate(null);
    }
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          position: "sticky",
          height: "70vh",
          width: "100%",
          top: 10,
        }}
      ></div>
    );
  }
  const toggleDatePicker = () => {
    if (isDateOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsDateOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setIsDateOpen(true);
      setTimeout(() => setIsAnimating(false), 10);
    }
  };
  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-2 w-full px-auto py-3 items-start " +
        (!isSearch ? "container" : "")
      }
    >
      <div className="filter-box-input w-full col-span-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="filter-box-title">
              <PiSquaresFour fontSize={18} />
            </div>
            <div className="font-[inter-b] text-black font-[700]">Search</div>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="filter-box-placeholder"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-box-input w-full col-span-2">
        <div className=" w-full">
          <div className="flex items-center gap-2">
            <div className="filter-box-title">
              <CiLocationOn fontSize={18} />
            </div>
            <div className="font-[inter-b] text-black font-[700]">Where</div>
          </div>
          <input
            type="text"
            placeholder="Where are you going?"
            className="filter-box-placeholder w-full"
            ref={placeAutoComplete}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (!e.target.value) {
                setLocation(null);
              }
            }}
          />
        </div>
      </div>
      <div className="fl-t  w-full flex flex-col items-center relative col-span-2">
        <div
          className="filter-box-input w-full"
          // onClick={() => setIsDateOpen(!isDateOpen)}
          onClick={toggleDatePicker}
        >
          <div>
            <div className="flex items-center gap-2 text-black">
              <div className="filter-box-title">
                <CiCalendar fontSize={18} />
              </div>
              <div className="font-[inter-b] text-black font-[700]">Date</div>
            </div>
            <p
              className={
                "filter-box-placeholder2 " +
                (startDate || endDate ? "text-black" : "text-gray-400 ")
              }
            >
              {/* date from moment - no time with day name  */}
              {/* {moment(startDate).format("ll")} */}
              {isSingleDay
                ? startDate
                  ? moment(startDate).format("LL")
                  : "Select a date"
                : startDate && endDate
                ? `${moment(startDate).format("LL")} - ${moment(endDate).format(
                    "LL"
                  )}`
                : "Select date range"}
            </p>
          </div>
        </div>
        {isDateOpen && (
          <div
            className={`filter-custom-box-datepicker w-full md:w-auto z-[100] mt-1 ${
              isSearch ? "absolute filter-custom-box-datepicker-search" : ""
            } ${isAnimating ? "closing" : "opening"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 justify-center">
              <div className="filter-custom-tabs">
                <button
                  className={`filter-custom-tab-button ${
                    isSingleDay ? "filter-active" : ""
                  }`}
                  onClick={() => handleTabClick(true)}
                >
                  Single day
                </button>
              </div>
              <div className="filter-custom-tabs">
                <button
                  className={`filter-custom-tab-button ${
                    !isSingleDay ? "filter-active" : ""
                  }`}
                  onClick={() => handleTabClick(false)}
                >
                  Multi-day
                </button>
              </div>
            </div>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange={!isSingleDay} // Multi-day selection if false
              monthsShown={2} // Show two months
              inline
              onClick={(e) => e.stopPropagation()}
              minDate={new Date()}
            />
            <div className="filter-custom-buttons-container">
              <button
                className="filter-custom-cancel-btn cursor-pointer"
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setIsDateOpen(false);
                  setIsApplyEnabled(false);
                }}
              >
                Cancel
              </button>
              <button
                className="filter-custom-apply-btn"
                disabled={!isApplyEnabled}
                onClick={() => setIsDateOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        className="filter-box-search bg-pink-500 col-span-2 xl:col-span-1"
        onClick={handleSearch}
      >
        <FaSearch />
        <p className="text-white">Search</p>
      </button>
    </div>
  );
};

export default FilterList;
