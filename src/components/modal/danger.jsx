import { CgDanger } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";

import React from "react";
import Modal from ".";

export default function DangerModal({
  open,
  onClose,
  title = "Danger",
  dangerBtnText = "Delete",
  cancelBtnText = "Cancel",
  desc = "Are you sure you want to delete this item?",
  onDanger,
  onCancel,
  loading = true,
}) {
  return (
    <Modal title="" open={open} onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-5">
        <CgDanger size={50} className="text-red-500" />
        <h1 className="text-lg md:text-2xl  font-bold text-red-500">{title}</h1>
        <p className="text-sm md:text-base text-center">{desc}</p>
        <div className="flex flex-row justify-end w-full items-center mt-5">
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2"
            onClick={onCancel || onClose}
            disabled={loading}
          >
            {cancelBtnText}
          </button>
          <button
            onClick={onDanger}
            className="bg-red-500 text-white px-3 py-2 rounded-md flex gap-2 items-center justify-center"
            disabled={loading}
          >
            {loading && (
              <ClipLoader color="#fff" speedMultiplier={2} size={18} />
            )}
            {dangerBtnText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
