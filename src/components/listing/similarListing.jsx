"use client";

import { Heart } from "lucide-react";
import { GiFishingBoat } from "react-icons/gi";

const listings = [
  {
    id: 1,
    name: "Azimut 55 Fly",
    location: "Podstrana",
    passengers: 7,
    power: "740 HP",
    captain: "Captain mandatory",
    year: 2020,
    length: "55 ft",
    rating: 4.8,
    reviews: 230,
    price: 27071,
    images:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500&auto=format",
  },
  {
    id: 2,
    name: "Azimut 55 Fly",
    location: "Podstrana",
    passengers: 7,
    power: "740 HP",
    captain: "Captain mandatory",
    year: 2020,
    length: "55 ft",
    rating: 4.8,
    reviews: 230,
    price: 27071,
    images:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500&auto=format",
  },
  {
    id: 3,
    name: "Azimut 55 Fly",
    location: "Podstrana",
    passengers: 7,
    power: "740 HP",
    captain: "Captain mandatory",
    year: 2020,
    length: "55 ft",
    rating: 4.8,
    reviews: 230,
    price: 27071,
    images:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500&auto=format",
  },
  {
    id: 4,
    name: "Azimut 55 Fly",
    location: "Podstrana",
    passengers: 7,
    power: "740 HP",
    captain: "Captain mandatory",
    year: 2020,
    length: "55 ft",
    rating: 4.8,
    reviews: 230,
    price: 27071,
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500&auto=format",
    ],
  },
];

export default function BoatListings() {
  return (
    <div className="border-t pt-3 mt-10 mb-20">
      <h2 className="text-2xl font-bold my-6">Similar listings</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded-lg overflow-hidden flex p-1"
          >
            <div className="w-2/5">
              <img
                src={listing.images}
                alt={listing.name}
                className="w-full h-48 rounded-md"
              />
            </div>
            <div className="p-4 w-3/5 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold">{listing.name}</h3>
                  <Heart className="w-4 h-4" />
                </div>
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-gray-600">
                    {listing.location} · {listing.passengers} pers ·{" "}
                    {listing.power} · {listing.captain}
                  </p>
                  <p className="text-sm text-gray-600">
                    {listing.year} · {listing.length}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-sm">⭐ {listing.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({listing.reviews})
                  </span>
                  <div>
                    <img src="/assets/same-boats.svg" alt="" />
                  </div>
                </div>
                <div className="font-semibold">
                  ${listing.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
