"use client";

import { Progress } from "antd";

export default function RatingProgress() {
  const ratings = [
    { rating: 5, percentage: 90 },
    { rating: 4, percentage: 10 },
    { rating: 3, percentage: 45 },
    { rating: 2, percentage: 8 },
    { rating: 1, percentage: 5 },
  ];

  return (
    <div className="max-w-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Overall rating</h2>
      <div className="space-y-4">
        {ratings.map(({ rating, percentage }) => (
          <div key={rating} className="flex items-center gap-4">
            <span className="w-4 text-sm font-bold text-gray-600">
              {rating}
            </span>
            <Progress
              percent={percentage}
              showInfo={false}
              strokeColor="#FFB800"
              trailColor="#F5F5F5"
              strokeWidth={12}
              className="flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
