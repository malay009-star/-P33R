import * as React from "react";
const PinSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#9CA3AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="M7 9.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
    />
    <path
      stroke="#9CA3AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      d="M7 16.5c3-3 6-5.686 6-9a6 6 0 0 0-12 0c0 3.314 3 6 6 9Z"
    />
  </svg>
);
export default PinSvg;
