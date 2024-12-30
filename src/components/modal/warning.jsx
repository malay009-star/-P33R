import { FiAlertTriangle } from "react-icons/fi";
import React from "react";
import Modal from ".";

export default function WarningModal({
  open,
  onClose,
  title = "Warning",
  warningBtnText = "Proceed",
  cancelBtnText = "Cancel",
  desc = "Are you sure you want to continue with this action?",
  onWarning,
  onCancel,
}) {
  return (
    <Modal title="" open={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-5">
        <FiAlertTriangle size={50} className="text-yellow-500" />
        <h1 className="text-lg md:text-2xl font-bold text-yellow-600">
          {title}
        </h1>
        <p className="text-sm md:text-base text-center">{desc}</p>
        <div className="flex flex-row justify-end w-full items-center mt-5">
          <button
            className="bg-gray-300 text-black px-3 py-2 rounded-md mr-2"
            onClick={onCancel || onClose}
          >
            {cancelBtnText}
          </button>
          <button
            onClick={onWarning}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md"
          >
            {warningBtnText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
