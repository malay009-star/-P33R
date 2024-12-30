"use client";
import RtPhoneInput from "react-phone-input-2";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import "./calendar.css";

import React, { useRef, useState } from "react";

import "react-phone-input-2/lib/bootstrap.css";
import "./index.css";

export default function TextInput({
  icon,
  label,
  type = "text",
  tref,
  ...props
}) {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState("password");

  return (
    <div
      className={
        "border w-full bg-white flex items-center rounded-xl min-h-[42px] overflow-hidden py-[10px] px-[10px] hover:border-[#C75D9C] " +
        (focus
          ? "border border-[#C75D9C] text-[#C75D9C]"
          : "border border-gray-500 text-gray-500")
      }
    >
      {icon && icon()}
      {/* <IoMdEye className="mr-2" size={25} /> */}
      <div className="flex flex-col flex-1">
        <label
          className={
            "text-[12px] font-manrope  " +
            (focus ? "text-[#C75D9C]" : "text-gray-500")
          }
        >
          {label}
        </label>
        <div className="flex items-center w-full">
          <input
            className="flex-1 text-[14px] leading-5 outline-none custom-input2  "
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
            type={type === "password" ? showPassword : type}
            ref={tref}
            {...props}
          />
          {type === "password" && (
            <div
              onClick={() => {
                setShowPassword(
                  showPassword === "password" ? "text" : "password"
                );
              }}
              className="cursor-pointer"
            >
              {showPassword === "password" ? (
                <IoMdEyeOff size={20} />
              ) : (
                <IoMdEye size={20} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const OTPInput = ({ icon, label, type = "text", tref, ...props }) => {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState("password");

  return (
    // <div
    //   className={
    //     "border  bg-white flex items-center rounded-xl min-h-[42px] overflow-hidden py-[10px] px-[10px] " +
    //     (focus
    //       ? "border border-[#C75D9C] text-[#C75D9C]"
    //       : "border border-gray-500 text-gray-500")
    //   }
    // >
    <input
      className={
        "custom-input2 outline-none bg-white flex items-center rounded-xl min-h-[42px] overflow-hidden py-[10px] px-[10px] text-center max-w-[40px] " +
        (focus
          ? "border border-[#C75D9C] text-[#C75D9C]"
          : "border border-gray-500 text-gray-500")
      }
      onFocus={() => {
        setFocus(true);
      }}
      onBlur={() => {
        setFocus(false);
      }}
      type={type === "password" ? showPassword : type}
      ref={tref}
      maxLength={1}
      {...props}
    />
    // </div>
  );
};

export const PhoneInput = ({ label, parentClass = "", ...props }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={
        "border w-full bg-white flex flex-col min-h-[42px] rounded-xl " +
        (focus
          ? "border border-[#C75D9C] text-[#C75D9C] "
          : "border border-gray-500 text-gray-500 ") +
        parentClass
      }
    >
      <label
        className={
          "text-[12px] font-manrope  " +
          (focus ? "text-[#C75D9C]" : "text-gray-500")
        }
      >
        {label}
      </label>
      <div className="flex items-center w-full">
        <RtPhoneInput
          country={"us"}
          inputStyle={{
            // width: "100%",
            borderRadius: "15px",
          }}
          {...props}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </div>
    </div>
  );
};
export const PhoneInput2 = ({ label, parentClass = "", ...props }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={
        "w-full border border-gray-300 rounded-md bg-white flex flex-col"
      }
    >
      <label className={"text-[12px] font-manrope"}>{label}</label>
      <div className="flex items-center w-full">
        <RtPhoneInput
          country={"us"}
          inputStyle={{
            width: "100%",
            height: "45px",
          }}
          {...props}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
      </div>
    </div>
  );
};

export const SelectInput = ({ label, options, ...props }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={
        "border w-full bg-white flex flex-col rounded-xl px-[16px] " +
        (focus
          ? "border border-[#C75D9C] text-[#C75D9C]"
          : "border border-gray-500 text-gray-500")
      }
    >
      <label
        className={
          "text-[12px] font-manrope  " +
          (focus ? "text-[#C75D9C]" : "text-gray-500")
        }
      >
        {label}
      </label>
      <div className="flex items-center w-full">
        <select
          className="flex-1 text-[14px] leading-5 h-[42px] rounded-xl outline-none"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export const TextArea = ({ label, ...props }) => {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={
        "border w-full bg-white flex h-[100px] py-[10px] px-[16px] flex-col rounded-xl " +
        (focus
          ? "border border-[#C75D9C] text-[#C75D9C]"
          : "border border-gray-500 text-gray-500")
      }
    >
      <label
        className={
          "text-[12px] font-manrope  " +
          (focus ? "text-[#C75D9C]" : "text-gray-500")
        }
      >
        {label}
      </label>

      <textarea
        className="flex-1 text-[14px] leading-5 outline-none"
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        {...props}
      />
    </div>
  );
};

export function ButtonInput({
  icon,
  label,
  type = "text",
  value,
  wd = "w-full md:w-[300px]",
  className = "",
  children,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const setTimeRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onMouseLeave = () => {
    clearTimeout(setTimeRef.current);
    setTimeRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 350);
  };

  const onMouseEnter = () => {
    clearTimeout(setTimeRef.current);
  };

  return (
    <div className="relative">
      <div
        className={
          "border bg-white flex items-center rounded-xl min-h-[42px] overflow-hidden py-[10px] px-[10px] hover:border-[#C75D9C] " +
          wd +
          " " +
          className
        }
        onClick={toggleMenu}
        onMouseLeave={() => {
          onMouseLeave();
        }}
      >
        {icon && icon()}
        <div className="flex flex-col flex-1">
          <label className={"text-[12px] text-gray-500 font-manrope"}>
            {label}
          </label>
          <div className="flex items-center w-full">
            <p className="flex-1 text-[14px] h-[20px] leading-5">{value}</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="min-w-[300px] min-h-[50px] absolute bg-slate-100 shadow-2xl rounded p-2 top-[65px] z-50 right-0 left-0 md:left-0 md:right-auto"
          onMouseEnter={() => {
            onMouseEnter();
          }}
          onMouseLeave={() => {
            onMouseLeave();
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function CalendarInput({
  icon,
  label,
  type = "text",
  value,
  wd = "w-full md:w-[300px]",
  className = "",
  inputValue,
  parentClassname = "",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const setTimeRef = useRef();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onMouseLeave = () => {
    clearTimeout(setTimeRef.current);
    setTimeRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 350);
  };

  const onMouseEnter = () => {
    clearTimeout(setTimeRef.current);
  };

  return (
    <div className={"relative " + parentClassname}>
      <div
        className={
          "border bg-white flex items-center rounded-xl min-h-[42px] overflow-hidden py-[10px] px-[10px] hover:border-[#C75D9C] " +
          wd +
          " " +
          className
        }
        onClick={toggleMenu}
        onMouseLeave={() => {
          onMouseLeave();
        }}
      >
        <FaRegCalendarAlt size={25} color="#C75D9C" className="mr-3" />
        <div className="flex flex-col flex-1">
          <label className={"text-[12px] text-gray-500 font-manrope"}>
            {label}
          </label>
          <div className="flex items-center w-full">
            <p className="flex-1 text-[14px] h-[20px] leading-5">
              {inputValue}
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="w-[300px] absolute bg-white shadow-2xl rounded p-2 top-[61px] z-50"
          onMouseEnter={() => {
            onMouseEnter();
          }}
          onMouseLeave={() => {
            onMouseLeave();
          }}
        >
          <Calendar value={value} {...props} />
        </div>
      )}
    </div>
  );
}
