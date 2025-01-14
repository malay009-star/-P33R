"use client";

import { Star } from "lucide-react";

// Review data array
const reviews = [
  {
    id: 1,
    name: "Julita Czyżewska",
    date: "25 may, 20222",
    rating: 4.8,
    totalReviews: 230,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.",
  },
  {
    id: 2,
    name: "Julita Czyżewska",
    date: "25 may, 20222",
    rating: 4.8,
    totalReviews: 230,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    text: "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.",
  },
  {
    id: 3,
    name: "Julita Czyżewska",
    date: "25 may, 20222",
    rating: 4.8,
    totalReviews: 230,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.",
  },
  {
    id: 4,
    name: "Julita Czyżewska",
    date: "25 may, 20222",
    rating: 4.8,
    totalReviews: 230,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    text: "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.",
  },
  {
    id: 5,
    name: "Julita Czyżewska",
    date: "25 may, 20222",
    rating: 4.8,
    totalReviews: 230,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.",
  },
  {
    id: 6,
    name: "Julita Czyżewska",
    date: "25 may, 20222",
    rating: 4.8,
    totalReviews: 230,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    text: "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.",
  },
];

export default function ReviewsGrid() {
  return (
    <div className="mt-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4">
            <div>
              <div className="flex gap-3 mb-1">
                <img
                  src={review.image}
                  alt={`${review.name}'s profile`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <span className="text-sm text-gray-500">{review.date}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{review.rating}</span>
                    <span className="text-gray-500">
                      ({review.totalReviews})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-2">{review.text}</p>
              <button className="text-sm font-medium text-gray-900 underline">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-center py-[6px] px-3 border rounded-full hover:bg-gray-50">
        Show all {reviews.length} reviews
      </button>
    </div>
  );
}
