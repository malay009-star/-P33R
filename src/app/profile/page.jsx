"use client";
import "../globals.css";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
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
function ProfilePage() {
  const { profile } = useAuth();

  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState(false);

  return (
    <>
      <div className="container bg-[#F2F6F7] flex justify-center items-center min-h-[90vh] py-[50px] ">
        <div className="p-8 rounded-2x flex justify-center items-start flex-col md:flex-row  gap-10 ">
          {/* Profile Img */}
          {/* <div className="flex flex-col gap-5 items-center">
            <div className="relative rounded-full w-[144px] h-[144px] overflow-hidden">
      
              <Image
                src={getAvatar(profile?.avatar)}
                alt="profile"
                fill
                priority
              />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="text-[#1F1C1E] text-xl font-Urbanist leading-normal font-bold">
                  {profile?.name}
                </p>
                <p className="text-[#535052] font-Manrope text-sm leading-normal">
                  {profile?.email}
                </p>
              </div>
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setEdit(true)}
              >
                <div className="bg-gradient-to-r from-gradientBlue via-gradientLightBlue to-gradientPink bg-clip-text text-transparent text-center font-manrope text-base leading-normal">
                  <FiEdit3 className="text-gradientBlue text-[20px] font-Manrope text-base leading-normal" />
                </div>
                <p className="bg-gradient-to-r from-gradientBlue via-gradientLightBlue to-gradientPink bg-clip-text text-transparent text-center font-manrope text-sm font-medium">
                  Edit Profile
                </p>
              </div>
            </div>
          </div> */}
          <div className=" mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-8 h-[325px] w-full md:w-[282px]">
            {/* Profile Image */}
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 ">
              <img
                src={getAvatar(profile?.avatar)}
                alt="profile"
                // fill
                // priority
                className="object-contain w-full h-full"
              />
            </div>

            {/* Name and Email */}
            <div className="text-center mt-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {profile?.name}
              </h2>
              <p className="text-sm text-gray-500"> {profile?.email}</p>
            </div>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {/* Personal Info Button */}
              <button className="w-full flex items-center space-x-3 py-2 px-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
                <FaUserAlt className="text-pink-600" />
                <span className="text-gray-800 text-sm font-medium">
                  Personal Info
                </span>
              </button>
              {/* Change Password Button */}
              {profile?.provider === "email" && (
                <button
                  className="w-full flex items-center space-x-3 py-2 px-4 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition"
                  onClick={() => setPassword(true)}
                >
                  <FaLock className="text-pink-600" />
                  <span className="text-gray-800 text-sm font-medium">
                    Change Password
                  </span>
                </button>
              )}
            </div>
          </div>
          {/* Profile details */}
          <div className="p-8 rounded-2xl bg-[#FAFBFC] flex flex-col gap-6 h-[600px]">
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
        </div>
      </div>
      {edit && <ProfileModal open={edit} onClose={() => setEdit(false)} />}
      {password && (
        <PasswordModal open={password} onClose={() => setPassword(false)} />
      )}
    </>
  );
}

export default ProfilePage;
