import React from "react";
import {
  Track,
  Riders,
  Boat,
  Sam,
  Expedia,
  MyBoat,
  Whimstay,
  Gorental,
  Google,
  Aws,
  Fluid,
  Rvshare,
} from "@components/svg";
import AwsIcon from "@/svg/aws";
const partners = [
  {
    name: "Fluid Truck",
    description: "On-demand truck rentals for businesses, fast and easy.",
    logo: <Fluid />,
  },
  {
    name: "Riders Share",
    description: "Peer-to-peer motorcycle rentals for adventure enthusiasts.",
    logo: <Riders />,
  },
  {
    name: "Boatsetter",
    description:
      "Rent boats easily, from pontoons to yachts, for any adventure.",
    logo: <Boat />,
  },
  {
    name: "Sam Boat",
    description: "Rent boats and yachts with ease—sail your perfect getaway.",
    logo: <Sam />,
  },
  {
    name: "Expedia",
    description: "Explore flights, hotels, and travel experiences worldwide.",
    logo: <Expedia />,
  },
  {
    name: "Get My Boat",
    description: "Rent boats for unforgettable water adventures.",
    logo: <MyBoat />,
  },
  {
    name: "Whimstay",
    description:
      "Last-minute vacation rentals at unbeatable prices for travelers.",
    logo: <Whimstay />,
  },
  // {
  //   name: "Go Rentals",
  //   description:
  //     "Rent cars, vans, and trucks with ease for short or long-term use.",
  //   // logo: <Gorental />,
  // },
  // {
  //   name: "RV Share",
  //   description: "Rent RVs for road trips and outdoor adventures, hassle-free.",
  //   logo: <Rvshare />,
  // },
];

const vendors = [
  // {
  //   name: "Google",
  //   description:
  //     "Leverage Google’s powerful tools—ads, cloud, and analytics—to grow and optimize your business operations effectively.",
  //   icon: <Google />,
  // },
  // {
  //   name: "Amazon Web Services",
  //   description:
  //     "Cloud-based solutions offering scalable computing power, storage, and AI tools to support businesses of all sizes.",
  //   icon: <Aws />,
  // },
  {
    name: "We Can Track",
    description:
      "Real-time tracking for vendors to manage inventory and deliveries, ensuring transparency and efficiency in every step.",
    icon: <Track />,
  },
];

const Partners = () => {
  return (
    <div className="py-10 px-5 font-[inter-r]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-[super] font-bold">P33R Partners</h1>
        <p className="text-gray-600 mt-2">
          Enter the email address associated with your account, and we will
          email you a link to reset your password
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-center mb-4">
              {partner.logo}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {partner.name}
            </h2>
            <p className="text-gray-600 text-sm">{partner.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">P33R Vendors</h1>
        <p className="text-gray-600 mt-2">
          Enter the email address associated with your account, and we will
          email you a link to reset your password
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-center mb-4">
              {vendor.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {vendor.name}
            </h2>
            <p className="text-gray-600 text-sm">{vendor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
