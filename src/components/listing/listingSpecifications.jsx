import React from "react";

const VesselSpecifications = () => {
  const specifications = [
    {
      label: "Person",
      value: "14 person",
    },
    {
      label: "HP",
      value: "880",
    },
    {
      label: "ft",
      value: "66 ft (20.2m)",
    },
    {
      label: "Year",
      value: "2023",
    },
    {
      label: "Captain",
      value: "With Captain",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-2 gap-y-6 w-full border-t border-b py-4">
      {specifications.map((spec, index) => (
        <div key={index}>
          <p className="text-[15px] pb-1">{spec.label}</p>
          <h5 className="font-medium">{spec.value}</h5>
        </div>
      ))}
    </div>
  );
};

export default VesselSpecifications;
