import React from "react";
import ReactLoading from "react-loading";

export default function EmptyData({ text = "No Data Found", loading = false }) {
  return loading ? (
    <div className="pt-[100px]">
      <ReactLoading type={"bars"} color={"#D750A0"} width={60} />
    </div>
  ) : (
    <div>
      <p className="text-3xl text-center text-gray-600">{text}</p>
      <p className="text-lg text-center text-gray-400 ">
        There is nothing to show here
      </p>
      <img src="/assets/empty.png" alt="empty" />
    </div>
  );
}
