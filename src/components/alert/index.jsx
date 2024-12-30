// src/Alert.js
import React from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Alert = ({ type, message }) => {
  let icon;
  let bgColor;

  switch (type) {
    case "success":
      icon = <FaCheckCircle className="text-green-500" />;
      bgColor = "bg-green-100";
      break;
    case "error":
      icon = <FaTimesCircle className="text-red-500" />;
      bgColor = "bg-red-100";
      break;
    case "warning":
      icon = <FaExclamationCircle className="text-yellow-500" />;
      bgColor = "bg-yellow-100";
      break;
    case "info":
      icon = <FaInfoCircle className="text-blue-500" />;
      bgColor = "bg-blue-100";
      break;
    default:
      icon = <FaInfoCircle className="text-gray-500" />;
      bgColor = "bg-gray-100";
  }

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm ${bgColor} rounded-lg`}
      role="alert"
    >
      <div className="mr-3">{icon}</div>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
