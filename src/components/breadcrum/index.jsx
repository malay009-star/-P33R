// components/Breadcrumb.js
import "./breadcrum.css";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="breadcrumbContainer">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbItem">
            {index !== items.length - 1 ? (
              <>
                <Link href={item.path} className="inactive">
                  {item.label}
                </Link>
                <span className="arrow">
                  {" "}
                  <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </>
            ) : (
              <span className="active capitalize">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
