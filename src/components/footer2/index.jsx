import React from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className=" w-full px-4 md:px-20 lg:px-32 xl:px-[200px] py-4 z-10 relative mt-auto ">
      <div className=" flex font-[inter-r] flex-col md:flex-row items-center justify-between text-sm text-[#D1D5DB]">
        {/* Links Section */}
        <div className="space-x-2 md:space-x-4 flex flex-wrap items-center justify-center md:justify-normal md:flex-row  md:items-start mb-4 md:mb-0">
          <a
            href="/about-us"
            className="hover:text-white transition-colors duration-300"
          >
            About P33R
          </a>
          <span className="hidden md:inline text-[#9CA3AF] text-[25px]">·</span>
          <a
            href="/privacy-policy"
            className="hover:text-white transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <span className="hidden md:inline text-[#9CA3AF] text-[25px]">·</span>
          <a
            href="terms-and-conditions"
            className="hover:text-white transition-colors duration-300"
          >
            Terms & Conditions
          </a>
          <span className="hidden md:inline text-[#9CA3AF] text-[25px]">·</span>
          <a
            href="/inquiry-form"
            className="hover:text-white transition-colors duration-300"
          >
            Partner with P33R
          </a>
        </div>

        {/* Social Icons Section */}
        <div className="flex space-x-4 text-gray-500">
          <a
            href="https://www.linkedin.com/company/p33rglobal/?viewAsMember=true"
            className="hover:text-[#D855A0]"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61566713021143"
            className="hover:text-[#D855A0]"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/p33rofficial/"
            className="hover:text-[#D855A0]"
          >
            <FaInstagram />
          </a>
          <a href=" https://x.com/P33Rglobal" className="hover:text-[#D855A0]">
            <FaXTwitter />
          </a>
        </div>
      </div>
      <hr class="border-gray-200 sm:mx-auto dark:border-gray-700 mb-2 mt-2" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-2">
        © 2025{" "}
        <a href="https://p33r.com/" class="hover:underline">
          P33R™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
    // <footer className="flex bg-black text-white py-4 text-center mt-auto  relative z-10">
    //   <p>
    //     About P33R · Privacy policy · Terms & conditions · Partner with P33R
    //   </p>
    // </footer>
  );
};

export default Footer;
