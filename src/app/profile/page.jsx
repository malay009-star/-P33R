"use client";
import "../globals.css";
import { useRef } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Input } from "antd";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import Image from "next/image";
import { useAuth } from "@/hooks";
import { getAvatar } from "@/utils/image";
import ProfileModal from "@/components/profile/modal";
import { useState } from "react";
import PasswordModal from "@/components/profile/password";
import { CiEdit } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { EditOutlined } from "@ant-design/icons";

function ProfilePage() {
  const { profile } = useAuth();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(getAvatar(profile?.avatar));

  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);

  const showPersonalDetail = () => {
    setShowPersonalInfo(true);
  };

  const showChangePasswordDetail = () => {
    setShowPersonalInfo(false);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl); // Update preview
      // Aap yahan file ko backend API par upload kar sakte hain
    }
  };

  return (
    <div className="flex justify-center">
      <div className="container xl:w-[70%] !py-8 rounded-2x flex items-start flex-col md:flex-row gap-7">
        <div className="rounded-2xl shadow-md border h-80 pt-8 justify-center p-4 w-full md:w-1/3">
          {/* Profile Image */}
          <div className="relative w-24 h-24 mx-auto overflow-hidden z-0">
            <img
              src={preview}
              alt="profile"
              className="w-full h-full rounded-full bg-gray-50"
            />
            <EditOutlined
              onClick={handleIconClick}
              className="absolute bottom-2 flex justify-center items-center right-0 z-50 text-xl border bg-white rounded-full w-7 h-7 cursor-pointer"
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* Name and Email */}
          <div className="text-center mt-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {profile?.name ? profile?.name : profile?.email.split("@")[0]}
            </h2>
            <p className="text-sm text-gray-500"> {profile?.email}</p>
          </div>

          {/* Options */}
          <div className="mt-6 space-y-3">
            {/* Personal Info Button */}
            <button
              onClick={showPersonalDetail}
              className={`w-full flex items-center space-x-3 py-2 px-4 rounded-lg border border-gray-200 hover:bg-gray-100 ${
                showPersonalInfo ? "bg-gray-100" : "bg-gray-50"
              } transition`}
            >
              <FaUserAlt
                className={`${showPersonalInfo ? "text-[#D855A0]" : ""}`}
              />
              <span className="text-gray-800 text-sm font-medium">
                Personal Info
              </span>
            </button>
            {/* Change Password Button */}
            {/* {profile?.provider === "email" && ( */}
            <button
              className={`w-full flex items-center space-x-3 py-2 px-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 ${
                showPersonalInfo ? "bg-gray-50" : "!bg-gray-100"
              } transition`}
              onClick={showChangePasswordDetail}
            >
              <FaLock
                className={`${
                  showPersonalInfo ? "text-gray-500" : "text-[#D855A0] "
                }`}
              />
              <span className="text-gray-800 text-sm font-medium">
                Change Password
              </span>
            </button>
            {/* )} */}
          </div>
        </div>
        {/* Profile details */}
        <div className="p-8 rounded-2xl shadow-md border gap-6 w-full md:w-[70%] h-[600px]">
          {showPersonalInfo ? (
            <div>
              <div className="flex justify-between mb-8">
                <p className="text-[#1F1C1E] text-xl font-Urbanist font-bold">
                  Personal Info
                </p>
                <div
                  className=" cursor-pointer flex items-center gap-1"
                  onClick={() => setEdit(true)}
                >
                  <CiEdit className="text-[#D855A0] " />
                  <span className="text-black">Edit</span>
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col md:flex-col gap-6 md:gap-20">
                  {/* First name */}
                  <div className="md:flex gap-6 md:gap-20">
                    <div className="flex gap-4 md:min-w-[332px] items-start">
                      <div className="header-middle ">
                        <div className="header-inner">
                          <FiUser className="text-[#747073] text-[30px] font-Manrope text-base leading-normal" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                          First Name
                        </p>
                        <p className="text-[#747073] font-Manrope text-base leading-normal">
                          {profile?.firstname}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 md:min-w-[332px] items-start">
                      <div className="header-middle ">
                        <div className="header-inner">
                          <FiUser className="text-[#747073] text-[30px] font-Manrope text-base leading-normal" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                          Last Name
                        </p>
                        <p className="text-[#747073] font-Manrope text-base leading-normal">
                          {profile?.lastname}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex gap-6 md:gap-20">
                  {/* Email */}
                  <div className="flex gap-4 md:min-w-[332px] items-start">
                    <div className="header-middle ">
                      <div className="header-inner">
                        <MdOutlineMailOutline className="text-[#747073] text-[30px] font-Manrope text-base leading-normal" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                        Email
                      </p>
                      <p className="text-[#747073] font-Manrope text-base leading-normal">
                        {profile?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                    {/* Phone */}
                    <div className="flex gap-4 md:min-w-[332px] items-start">
                      <div className="header-middle ">
                        <div className="header-inner">
                          <MdOutlineLocalPhone className="text-[#747073] text-[30px] font-Manrope text-base leading-normal" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                          Phone Number
                        </p>
                        <p className="text-[#747073] font-Manrope text-base leading-normal">
                          {profile?.phone ? profile?.phone : "000-000-000"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Password */}
                {profile?.provider === "email" && (
                  <div className="flex gap-4 md:min-w-[332px] items-start">
                    <div className="header-middle ">
                      <div className="header-inner">
                        <IoKeyOutline className="text-[#747073] text-[30px] font-Manrope text-base leading-normal" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                        Password
                      </p>
                      <p
                        className="text-[#747073] font-Manrope text-base leading-normal underline"
                        onClick={() => setPassword(true)}
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-8">
                <p className="text-[#1F1C1E] text-xl font-Urbanist font-bold">
                  Change Password
                </p>
                <div
                  className=" cursor-pointer flex items-center gap-1"
                  onClick={() => setPassword(true)}
                >
                  <CiEdit className="text-[#D855A0] " />
                  <span className="text-black">Edit</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="border rounded-full w-[44px] h-[42px] flex items-center justify-center">
                  <TbLockPassword className="text-xl text-[#374151]" />
                </div>
                <div className="w-full">
                  <label htmlFor="" className="text-sm font-medium">
                    Password
                  </label>
                  <Input.Password
                    value="1234567810"
                    placeholder="************"
                    className="!border-none h-7 text-lg ps-1 placeholder:!text-black !w-full !focus:border-none !ring-0!"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {edit && <ProfileModal open={edit} onClose={() => setEdit(false)} />}
      {password && (
        <PasswordModal open={password} onClose={() => setPassword(false)} />
      )}
    </div>
  );
}

export default ProfilePage;
