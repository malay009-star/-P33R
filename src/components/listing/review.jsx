import { useState } from "react";
import { Progress } from "antd";

function Reviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewList1 = [
    { name: "Cleanliness", review: "4.8", rating: 98 },
    { name: "Communication", review: "4.5", rating: 90 },
    { name: "Check-in", review: "5.0", rating: 100 },
  ];
  const reviewList2 = [
    { name: "Accuracy", review: "4.8", rating: 98 },
    { name: "Location", review: "4.5", rating: 90 },
    { name: "Value", review: "5.0", rating: 100 },
  ];
  const reviewsList = [
    {
      name: "Julita Czyżewska",
      date: "25 may, 2022",
      review:
        "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.Only one note of caution - the property next door appears to be a wedding / Sangeet venue. Obviously, this is not something the hosts at Simbliss can control, but this is just something to keep in mind if you're looking for a peaceful night in.",
      img: "/reviewer-1.png",
    },
    {
      name: "Julita Czyżewska",
      date: "25 feb, 2022",
      review:
        "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean. Would recommend staying here.Only one note of caution - the property next door appears to be a wedding / Sangeet venue. Obviously, this is not something the hosts at Simbliss can control, but this is just something to keep in mind if you're looking for a peaceful night in.",
      img: "/reviewer-2.png",
    },
    {
      name: "Julita Czyżewska",
      date: "3 jan, 2022",
      review:
        "Perfect getaway for a weekend with Delhi. We went as a large group of friends with a dog and had a great time. The staff is very friendly and helpful, and the pool is lovely and clean.",
      img: "/reviewer-3.png",
    },
  ];

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className=" flex flex-col gap-10 border-b border-[#E0E0E0]">
        {/* Reviews Heading */}
        <div className="flex flex-col gap-2 items-start pt-[24px] pb-[24px]">
          <p className="bg-gradient-to-r from-gradientBlue via-gradientLightBlue to-gradientPink bg-clip-text text-transparent text-center font-manrope text-xl font-medium">
            Reviews
          </p>
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex flex-col gap-4 md:pr-6 md:border-r md:border-[#E0E0E0]">
              {reviewList1.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-6 w-full md:min-w-[348px] items-center flex-wrap"
                >
                  <p className="text-[#535052] w-[90px] text-sm font-Manrope leading-normal font-medium">
                    {item.name}
                  </p>
                  <div className="flex flex-1 gap-2 items-center justify-center">
                    <Progress
                      percent={item.rating}
                      showInfo={false}
                      strokeColor="#ffc107"
                      className="antdProgress m-0"
                    />

                    <span className="text-[#535052] text-sm leading-normal font-Manrope font-medium">
                      {item.review}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 ">
              {reviewList2.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-6 w-full md:min-w-[348px] items-center flex-wrap"
                >
                  <p className="text-[#535052] w-[80px] text-sm font-Manrope leading-normal font-medium">
                    {item.name}
                  </p>
                  <div className="flex flex-1 gap-2 items-center justify-center">
                    <Progress
                      percent={item.rating}
                      showInfo={false}
                      strokeColor="#ffc107"
                      className="antdProgress m-0"
                    />
                    <span className="text-[#535052] text-sm leading-normal font-Manrope font-medium">
                      {item.review}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          <div className="flex flex-col gap-8">
            {reviewsList.map((item, index) => (
              <div key={index} className="flex flex-col gap-5">
                <div className="flex gap-3">
                  <img
                    src={"https://i.pravatar.cc/300"}
                    alt="reviewer"
                    className="rounded-full w-12 h-12"
                  />
                  <div className="flex flex-col">
                    <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                      {item.name}
                    </p>
                    <p className="text-[#747073] font-Poppins text-xs leading-normal">
                      {item.date}
                    </p>
                  </div>
                </div>
                <p className="text-[#747073] font-Manrope text-sm leading-normal">
                  {item.review}
                </p>
              </div>
            ))}
            <button className="w-[157px] h-[35px] border border-gray-400 text-gray-600 rounded-full px-2 py-2 hover:bg-gray-100 transition text-[14px] mb-[24px]">
              Show all 20 reviews
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {reviewsList.map((item, index) => (
              <div key={index} className="flex flex-col gap-5">
                <div className="flex gap-3">
                  <img
                    src={"https://i.pravatar.cc/300"}
                    alt="reviewer"
                    className="rounded-full w-12 h-12"
                  />
                  <div className="flex flex-col">
                    <p className="text-[#1F1C1E] font-Manrope text-base leading-normal font-bold">
                      {item.name}
                    </p>
                    <p className="text-[#747073] font-Poppins text-xs leading-normal">
                      {item.date}
                    </p>
                  </div>
                </div>
                <p className="text-[#747073] font-Manrope text-sm leading-normal">
                  {item.review}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Show All button */}
        {/* <button
          className="w-fit py-2 px-4 rounded-full border border-[#747073] text-[#535052] font-Manrope text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Show all 20 reviews
        </button> */}
      </div>
    </>
  );
}

export default Reviews;
