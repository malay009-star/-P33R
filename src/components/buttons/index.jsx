import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function GradientButton({
  text = "Get Started",
  className,
  onClick,
  children,
  loading = false,
}) {
  return (
    <button
      className={
        "bg-gradient-to-r from-gradientBlue via-gradientLightBlue to-gradientPink text-white px-10 py-3 outline-none border-none text-center font-Manrope text-base w-full rounded-full " +
        className
      }
      onClick={onClick}
    >
      {text ? (
        <div
          className={
            "flex justify-center items-center" + (loading ? " gap-2" : "")
          }
        >
          {loading && <ClipLoader color="#fff" speedMultiplier={2} size={20} />}
          {text}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
