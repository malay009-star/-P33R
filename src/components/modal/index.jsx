import React, { useEffect } from "react";

export default function Modal({
  children,
  open,
  onClose,
  position = "items-center",
}) {
  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [open]);

  return (
    open && (
      <div
        id="authentication-modal"
        className="login-popup fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-[1000] overflow-y-scroll w-full py-2 md:p-4 md:inset-0 max-h-full"
      >
        <div
          className={"relative flex justify-center w-full h-full " + position}
        >
          <div className="relative bg-white rounded-lg z-[999999] shadow w-[90%] lg:max-w-[40vw]">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {children}
          </div>
        </div>
      </div>
    )
  );
}
