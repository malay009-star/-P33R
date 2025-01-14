import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/company/p33rglobal/?viewAsMember=true",
      icon: <FaLinkedinIn />,
    },
    {
      href: "https://www.facebook.com/profile.php?id=61566713021143",
      icon: <FaFacebookF />,
    },
    {
      href: "https://www.instagram.com/p33rofficial/",
      icon: <FaInstagram />,
    },
    {
      href: "https://x.com/P33Rglobal",
      icon: <FaXTwitter />,
    },
  ];

  return (
    <footer className=" container  z-10 relative mt-auto">
      <div className=" flex flex-col md:flex-row items-center justify-between text-sm text-[#030712]  border-t border-[#D1D5DB] font-[inter-r] py-[24px]">
        {/* Links Section */}
        <div className="space-x-2 md:space-x-4 flex flex-wrap items-center justify-center md:justify-normal md:flex-row  md:items-start mb-4 md:mb-0">
          <a
            href="/about-us"
            className="hover:text-black transition-colors duration-300"
          >
            About P33R
          </a>
          <span className="hidden md:inline text-[#9CA3AF] text-[25px]">·</span>
          <a
            href="/privacy-policy"
            className="hover:text-black transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <span className="hidden md:inline text-[#9CA3AF] text-[25px]">·</span>
          <a
            href="terms-and-conditions"
            className="hover:text-black transition-colors duration-300"
          >
            Terms & Conditions
          </a>
          <span className="hidden md:inline text-[#9CA3AF] text-[25px]">·</span>
          <a
            href="/inquiry-form"
            className="hover:text-black transition-colors duration-300"
          >
            Partner with P33R
          </a>
        </div>

        {/* Social Icons Section */}
        <div className="flex space-x-4 text-[#4B5563]">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="bg-[#F3F4F6] hover:bg-[#D855A0] hover:text-white text-sm w-8 h-8 flex items-center justify-center rounded-full transition duration-300 ease-in-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      {/* <hr class="border-gray-200 sm:mx-auto dark:border-gray-700 mb-2" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-2">
        © 2025{" "}
        <a href="https://p33r.com/" class="hover:underline">
          P33R™
        </a>
        . All Rights Reserved.
      </span> */}
    </footer>
  );
};

export default Footer;
