import React from "react";

// white button with hover effect
export default function WhiteButton({ text = "Get Started" }) {
  return (
    <button className="bg-gradient-to-r hover:from-gradientBlue hover:via-gradientLightBlue hover:to-gradientPink hover:text-white rounded-full bg-white px-10 py-3 w-fit text-[#1F1C1E] outline-none border-none text-center font-Manrope text-base font-bold hover:font-medium z-[2]">
      {text}
    </button>
  );
}
