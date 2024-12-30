import { AiOutlineCheckCircle } from "react-icons/ai";
import React from "react";
import Modal from ".";

export default function SuccessModal({
  open,
  onClose,
  title = "Success",
  successBtnText = "Confirm",
  cancelBtnText = "Cancel",
  desc = "Your action has been successfully completed!",
  onSuccess,
  onCancel,
}) {
  return (
    <Modal title="" open={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-5">
        <AiOutlineCheckCircle size={50} className="text-green-500" />
        <h1 className="text-lg md:text-2xl font-bold text-green-500">
          {title}
        </h1>
        <p className="text-sm md:text-base text-center">{desc}</p>
        <div className="flex flex-row justify-end w-full items-center mt-5">
          {onCancel && (
            <button
              className="bg-gray-300 text-black px-3 py-2 rounded-md mr-2"
              onClick={onCancel}
            >
              {cancelBtnText}
            </button>
          )}
          <button
            onClick={onSuccess}
            className="bg-green-500 text-white px-3 py-2 rounded-md"
          >
            {successBtnText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
