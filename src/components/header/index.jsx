"use client";
import { RiSearch2Line } from "react-icons/ri";

import React, { useEffect, useState } from "react";

import "./header.css";
import { useAuth } from "@/hooks";
import useModals from "@/hooks/modal";
import dynamic from "next/dynamic";
import Head from "next/head";

import { useRouter } from "next/navigation";
import { Peer } from "@components/svg";
import SparkleIcon from "./sparkle";
import { getAvatar } from "@/utils/image";

const DropDown = dynamic(() => import("./dropdown"));

export default function Header() {
  const { isLoggedin, logout, profile } = useAuth();
  const { setLogin, setRegister } = useModals();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => {
    if (typeof window !== "undefined") {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <header className="sticky top-0 z-[999]">
        <div className="container">
          <div className="Navbar">
            <div className="header-left">
              <span
                className="nav-logo cursor-pointer"
                onClick={() => router.push("/")}
              >
                {/* <AppLogo/> */}
                <Peer />
              </span>
              <div
                className={`nav-items  font-[inter-s] font-[600] text-[16px] cursor-pointer leading-[24.96px] text-[#030712] ${
                  isOpen && "open"
                }`}
              >
                {/* <div className="flex justify-between items-center">
                  <a
                    className="btn-log"
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    <p className="relative z-10 font-[inter-s] text-[#030712] font-[16px] leading-[19.36px] ">
                      Login
                    </p>
                  </a>
                  <a className="hidden btn-login md:flex items-center gap-2 justify-center">
                    <SparkleIcon />
                    <p className="font-[inter-s] text-[16px] text-white">
                      P33R AI
                    </p>
                  </a>
                </div> */}
                <div className="top-dropdown flex flex-col gap-2 md:flex-row">
                  <a>
                    {" "}
                    <div className=" btn-login md:flex items-center gap-2 justify-center">
                      <SparkleIcon />
                      <p className="font-[inter-s] text-[16px] text-white">
                        P33R AI
                      </p>
                    </div>
                  </a>
                  <a>
                    {!isLoggedin ? (
                      <div
                        className="btn-log"
                        onClick={() => {
                          setLogin(true);
                        }}
                      >
                        <p className="relative z-10 font-[inter-s] text-[#030712] font-[16px] leading-[19.36px] ">
                          Login
                        </p>
                      </div>
                    ) : (
                      <div
                        className="avatar relative"
                        onClick={() => {
                          router.push("/profile");
                        }}
                      >
                        <img
                          src={getAvatar(profile?.avatar)}
                          className="rounded-full"
                          alt="Avatar"
                        />

                        {/* <div className="dropdown-btn bg-slate-200 rounded-full">
                  <FaAngleDown fontSize="12px" className="down-icon" />
                </div> */}
                      </div>
                    )}
                  </a>
                </div>
                <div className="down-items">
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/");
                    }}
                  >
                    Home
                  </a>
                  {isLoggedin && (
                    <a
                      onClick={() => {
                        setIsOpen(!isOpen);
                        router.push("/profile");
                      }}
                      className="web"
                    >
                      {" "}
                      My Profile
                    </a>
                  )}
                  {isLoggedin && (
                    <a
                      onClick={() => {
                        setIsOpen(!isOpen);
                        router.push("/wishlist");
                      }}
                      className="web"
                    >
                      {" "}
                      Wishlist
                    </a>
                  )}
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/about-us");
                    }}
                  >
                    About Us
                  </a>
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/blogs");
                    }}
                  >
                    Blog
                  </a>
                  {/* <a onClick={() => setIsOpen(!isOpen)}>Blog</a> */}

                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/contact-us");
                    }}
                  >
                    {" "}
                    Contact
                  </a>
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/vendor");
                    }}
                  >
                    {" "}
                    Partners & Vendors
                  </a>
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/setting");
                    }}
                    className="web"
                  >
                    {" "}
                    Settings
                  </a>

                  {isLoggedin && (
                    <a
                      onClick={() => {
                        logout();
                        setIsOpen(!isOpen);
                      }}
                      className="web"
                    >
                      {" "}
                      Logout
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="nav-items header-right-items items-center">
              <button
                onClick={openChat}
                className="hidden btn-login md:flex items-center gap-2 justify-center"
              >
                <SparkleIcon />
                <p className="font-[inter-s] text-[16px] text-white">P33R AI</p>
              </button>

              {!isLoggedin && (
                <div className="header-btn">
                  <div
                    className="btn-log"
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    <p className="relative z-10 font-[inter-s] text-[#030712] font-[16px] leading-[19.36px] ">
                      Login
                    </p>
                  </div>
                </div>
              )}
              {isLoggedin && (
                <div
                  className="avatar relative"
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  <img
                    src={getAvatar(profile?.avatar)}
                    className="rounded-full"
                    alt="Avatar"
                  />

                  {/* <div className="dropdown-btn bg-slate-200 rounded-full">
                  <FaAngleDown fontSize="12px" className="down-icon" />
                </div> */}
                </div>
              )}
              <DropDown className="show" />
              {/* ..bars line.. */}
            </div>

            <div
              className={`nav-toggle ${isOpen && "open"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="bar"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
