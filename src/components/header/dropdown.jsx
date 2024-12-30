"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { getAvatar } from "@/utils/image";
import useModals from "@/hooks/modal";

export default function DropDown({ className }) {
  const router = useRouter();
  const pathname = usePathname();
  const setTimeRef = useRef();
  const { logout, profile, isLoggedin } = useAuth();
  const { setLogin, setRegister } = useModals();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
    <div className={"dropdown " + className}>
      {/* <div className="avatar relative" onClick={toggleMenu}>
        <img
          src={getAvatar(profile?.avatar)}
          className="rounded-full"
          alt="Avatar"
        />

        <div className="dropdown-btn bg-slate-200 rounded-full">
          <FaAngleDown fontSize="12px" className="down-icon" />
        </div>
      </div> */}
      <svg
        onClick={() => {
          toggleMenu();
        }}
        onMouseLeave={onMouseLeave}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33398 8L26.6673 8"
          stroke="#1F2937"
          strokeWidth="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33398 16L26.6673 16"
          stroke="#1F2937"
          strokeWidth="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33398 24L26.6673 24"
          stroke="#1F2937"
          strokeWidth="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {isOpen && (
        <div
          className="dropdown-content overflow-hidden"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {isLoggedin ? (
            <>
              <Link href="/profile">My Profile</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/setting">Settings</Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setLogin(true);
                  setIsOpen(false);
                }}
                className="w-full text-left "
              >
                Login
              </button>
              <button
                onClick={() => {
                  setRegister(true);
                  setIsOpen(false);
                }}
                className="w-full text-left "
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
