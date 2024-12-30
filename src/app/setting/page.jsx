import React from "react";
import Link from "next/link";
import { Privacy, Doc, Heart } from "@components/svg";
import { Component } from "lucide-react";
const SettingsPage = () => {
  const sections = [
    {
      title: "General Information",
      cards: [
        {
          icon: <Heart />,
          title: "Your Favorites",
          description:
            "Rent boats easily, from pontoons to yachts, for any adventure.",
          path: "/wishlist", // No functionality added, can be extended later
        },
      ],
    },
    {
      title: "Legal Information",
      cards: [
        {
          icon: <Doc />,
          title: "Terms & Conditions",
          description:
            "Rent boats easily, from pontoons to yachts, for any adventure.",
          path: "/terms-and-conditions",
        },
        {
          icon: <Privacy />,
          title: "Privacy Policy",
          description:
            "Rent boats easily, from pontoons to yachts, for any adventure.",
          path: "/privacy-policy",
        },
      ],
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto font-[inter-r]">
      {/* Header */}
      <h1 className="text-3xl font-bold">P33R Settings</h1>
      <p className="text-gray-600 mt-2">
        Customize your preferences, and manage account details,
        <br /> personalize your experience to suit your needs.
      </p>

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mt-10">
          {/* Section Title */}
          <h2 className="text-lg font-semibold">{section.title}</h2>
          <div className="mt-4 md:flex flex-wrap flex  gap-4">
            {/* Cards */}
            {section.cards.map((card, cardIndex) => (
              <Link key={cardIndex} href={card.path}>
                <div className=" md:w-[384px] md:h-[265px] px-4 py-[28px] bg-[#F9FAFB] shadow rounded-lg flex flex-col items-start gap-[48px] cursor-pointer hover:shadow-md transition">
                  {/* Icon */}
                  <div className="text-pink-500 bg-pink-100 p-4 rounded-full text-2xl">
                    {card.icon}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col gap-[8px]">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-gray-600 mt-1">{card.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;
