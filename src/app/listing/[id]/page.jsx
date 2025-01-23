"use client";
import "@components/listing/listing.css";
import "react-loading-skeleton/dist/skeleton.css";

import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import { FaPlus } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

import React, { useState, useEffect, useRef } from "react";

import Api from "@/api";
import MapView from "@/components/map/input";
import ImageViewer from "@components/listing/imageViewer";
import ListingSpecifications from "@/components/listing/listingSpecifications";
import ListingProgress from "@/components/listing/listingProgress";
import ReviewGrid from "@/components/listing/reviewGrid";
import SimilarListing from "@/components/listing/similarListing";
import "@components/filterlist/filter.css";
import { useRouter, useSearchParams } from "next/navigation";

const MyPage = ({ params }) => {
  const id = params.id;
  const search = useSearchParams();

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState(search.get("startDate") ?? "");
  const [checkOut, setCheckOut] = useState(search.get("endDate") ?? "");
  const mapRef = useRef();
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isSingleDay, setIsSingleDay] = useState(
    search.get("endDate") ? false : true
  );
  const [isApplyEnabled, setIsApplyEnabled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await Api.getListing(id, setLoading);

    if (res?.error) return;
    setProduct(res?.data);

    if (typeof res?.data?.images === "string") {
      setImages([]);
    } else setImages(res?.data?.images);
  };

  const handleTabClick = (isSingle) => {
    setIsSingleDay(isSingle);
    setIsDateOpen(true);
    if (isSingle) {
      setCheckOut(null);
    }
  };
  const handleDateChange = (dates) => {
    if (isSingleDay) {
      setCheckIn(dates);
      setIsApplyEnabled(!!dates);
    } else {
      const [start, end] = dates;
      setCheckIn(start);
      setCheckOut(end);
      setIsApplyEnabled(!!start && !!end);
    }
  };
  const toggleDatePicker = () => {
    if (isDateOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsDateOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setIsDateOpen(true);
      setTimeout(() => setIsAnimating(false), 10);
    }
  };

  const handleBookNow = () => {
    if (product?.link) window.open(product.link, "_blank");
    else router.push("/");
  };

  return (
    <section className="flex justify-center items-center bg-white">
      <main className="container">
        {/* <ImageViewer images={images} /> */}
        {(loading || images.length > 0) && (
          <ImageViewer
            images={loading ? [1, 2, 3, 4, 5] : images}
            showMore={false}
            loading={loading}
          />
        )}
        <div className="p-3">
          <div className="flex gap-6 flex-col lg:flex-row pb-[24px] w-full">
            {/* right side */}
            <div className="w-full lg:w-2/3 flex flex-col justify-start items-start">
              <div className="flex flex-col gap-16 w-full">
                <div className="flex flex-col gap-4 pb-[24px] w-full">
                  <p className="text-[#1F1C1E] font-[inter-b] text-[28px] font-bold flex-1">
                    {!loading ? product?.title : <Skeleton />}
                  </p>
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <div className="flex gap-4 items-start justify-start">
                      <div className="flex gap-2 items-center">
                        {(product?.location?.city ||
                          product?.location?.state ||
                          product?.location?.country) && (
                          <IoLocationSharp
                            className="text-gradientPink"
                            size={20}
                          />
                        )}

                        <p className="text-[#1F1C1E] font-Manrope text-base font-medium leading-normal">
                          {product?.location?.city &&
                          product?.location?.city !== "null"
                            ? product?.location?.city + ", "
                            : ""}
                          {product?.location?.state &&
                          product?.location?.state !== "null"
                            ? product?.state + ", "
                            : ""}
                          {product?.location?.country ?? "United States"}
                          {/* {product?.location?.city}, {product?.location?.state} */}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                          {product?.reviews?.score > 0 && (
                            <MdOutlineStarPurple500
                              className={
                                product?.reviews?.score > 5
                                  ? "text-[#FFB800]"
                                  : "text-gray-500"
                              }
                              size={20}
                            />
                          )}
                          <p className="text-[#1F1C1E] font-[inter-r] text-base font-medium leading-normal">
                            {product?.reviews?.score
                              ? product?.reviews?.score > 5
                                ? Number(product?.reviews?.score / 20).toFixed(
                                    1
                                  )
                                : Number(product?.reviews?.score).toFixed(1)
                              : ""}
                          </p>
                          {product?.reviews?.count && (
                            <p className="text-[#747073] font-[inter-r] text-base font-medium leading-normal">
                              ({product?.reviews?.count} Reviews)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* person detail */}
              <ListingSpecifications />

              <div class="max-w-4xl mx-auto pr-6 r w-full ">
                {/* Detail */}
                <div class="mt-[24px]">
                  <h3 class="text-2xl font-bold mb-2">Details</h3>
                  <div>
                    <h4 class="font-semibold">Rental Conditions</h4>
                    <ul class="mt-2">
                      <li class="flex justify-between">
                        <span>Type of rental</span>
                        <span>With captain</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Time of the beginning and end of the rental</span>
                        <span>5:00PM / 9:00AM</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Security deposit</span>
                        <span>No deposit required</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Cancellation policy</span>
                        <span>Personalized</span>
                      </li>
                      <li class="flex justify-between">
                        <span>Fuel</span>
                        <span>Not included</span>
                      </li>
                    </ul>
                    {/* <button class="text-[#D855A0] font-bold mt-2 flex items-center gap-1">
                      <FaPlus />
                      Show more
                    </button> */}
                  </div>
                </div>

                <div class="mt-6 w-full border-t border-b py-4">
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    <h3 class="text-2xl font-bold mb-2">About</h3>
                  )}
                  {loading ? (
                    <div className="w-full">
                      <Skeleton count={10} />
                    </div>
                  ) : (
                    <p class="text-gray-700">
                      {!show
                        ? product?.description?.substring(0, 272)
                        : product?.description}
                    </p>
                  )}
                  {!show && product?.description?.length > 50 && (
                    <button
                      class="text-[#D855A0] font-bold mt-2 flex items-center gap-1"
                      onClick={() => setShow(true)}
                    >
                      <FaPlus />
                      Show more
                    </button>
                  )}
                </div>
              </div>
              {/* ..map.. */}
              {product?.location?.latitude && product?.location?.longitude && (
                <React.Fragment>
                  <p className="w-fit bg-gradient-to-r py-6 from-gradientBlue via-gradientLightBlue to-gradientPink bg-clip-text text-transparent text-center font-manrope text-xl font-medium">
                    Map location
                  </p>
                  <MapView
                    mapRef={mapRef}
                    getUserLoc={false}
                    editable={false}
                    location={product?.location}
                    height={"50vh"}
                  />
                </React.Fragment>
              )}
              <div className="border-t border-b py-4 mt-6 w-full">
                <h2 className="text-xl font-bold mb-4">About the owner</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#074750] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">CP</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">Charter Partner</span>
                    <span className="text-gray-600 text-sm">
                      Member since 2022
                    </span>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium">4.8</span>
                        <span className="ml-1 text-sm text-gray-500">
                          (230)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* calendar */}
            {loading ? (
              <div className="w-full lg:w-1/3 rounded-[20px] h-[50vh] flex flex-col">
                <Skeleton height={"50vh"} />
              </div>
            ) : (
              <div className="add-border items-center w-full lg:w-5/12 p-6 rounded-[20px] bg-[#FAFAFA] flex flex-col gap-4 h-fit">
                <div className="fl-t w-[90%] flex flex-col items-center mx-auto relative">
                  <div
                    className="filter-box-input w-full"
                    onClick={toggleDatePicker}
                  >
                    <div>
                      <div className="flex items-center gap-2 text-black">
                        <div className="filter-box-title">
                          <CiCalendar fontSize={18} />
                        </div>
                        <div className="font-[inter-b] text-black font-[700]">
                          Date
                        </div>
                      </div>
                      <p className="filter-box-placeholder">
                        {/* date from moment - no time with day name  */}
                        {/* {moment(startDate).format("ll")} */}
                        {isSingleDay
                          ? checkIn
                            ? moment(checkIn).format("LL")
                            : "Select a date"
                          : checkIn && checkOut
                          ? `${moment(checkIn).format("LL")} - ${moment(
                              checkOut
                            ).format("LL")}`
                          : "Select date range"}
                      </p>
                    </div>
                  </div>
                  {isDateOpen && (
                    <div
                      className={`filter-custom-box-datepicker w-full lg:w-auto filter-custom-box-datepicker-search z-[100] mt-1 absolute ${
                        isAnimating ? "closing" : "opening"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2 justify-center">
                        <div className="filter-custom-tabs">
                          <button
                            className={`filter-custom-tab-button ${
                              isSingleDay ? "filter-active" : ""
                            }`}
                            onClick={() => handleTabClick(true)}
                          >
                            Single day
                          </button>
                        </div>
                        <div className="filter-custom-tabs">
                          <button
                            className={`filter-custom-tab-button ${
                              !isSingleDay ? "filter-active" : ""
                            }`}
                            onClick={() => handleTabClick(false)}
                          >
                            Multi-day
                          </button>
                        </div>
                      </div>
                      <DatePicker
                        selected={checkIn}
                        onChange={handleDateChange}
                        startDate={checkIn}
                        endDate={checkOut}
                        selectsRange={!isSingleDay} // Multi-day selection if false
                        monthsShown={2} // Show two months
                        inline
                        onClick={(e) => e.stopPropagation()}
                        minDate={new Date()}
                      />
                      <div className="filter-custom-buttons-container">
                        <button
                          className="filter-custom-cancel-btn cursor-pointer"
                          onClick={() => {
                            setCheckIn(null);
                            setCheckOut(null);
                            setIsDateOpen(false);
                            setIsApplyEnabled(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="filter-custom-apply-btn"
                          disabled={!isApplyEnabled}
                          onClick={() => setIsDateOpen(false)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-[90%] px-6 pt-2 ">
                  {/* Check in/out times */}
                  <div className="text-gray-700 text-">
                    Check in 5:00PM - Check out 9:00AM
                  </div>

                  {/* Rental details */}
                  <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                    <li>Captain included in price</li>
                    <li>Type of rental: With captain</li>
                  </ul>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Total price */}
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-medium">Total</span>
                    <span className="text-xl font-medium">$1,307</span>
                  </div>

                  {/* Request quote button */}
                  <button
                    onClick={handleBookNow}
                    className="w-full mt-4 bg-[#D855A0] hover:bg-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* progress */}
          <ListingProgress />

          <ReviewGrid />

          <SimilarListing />
        </div>
      </main>
    </section>
  );
};

export default MyPage;

const renderOption = ({ value, loading }) => {
  return loading ? (
    <Skeleton width={100} />
  ) : (
    <p class="text-sm text-gray-500">{value}</p>
  );
};

export const returnUsers = (value, label) => {
  return value > 0 ? value + " " + label + " " : "";
};

export const Option = ({ title, description, value, onLess, onMore }) => {
  return (
    <div className="flex justify-between p-2">
      <div>
        <p className="text-[#535052] text-Manrope text-md font-semibold">
          {title}
        </p>
        <p className="text-[#535052] text-Manrope text-sm">{description}</p>
      </div>
      <div className="flex gap-3 items-center ">
        <CiCircleMinus
          size={25}
          onClick={onLess}
          className={value > 0 ? "hover:text-gradientPink" : "text-gray-400"}
        />
        <p className="text-[#535052] text-Manrope text-md min-w-[15px] text-center font-bold">
          {value}
        </p>
        <CiCirclePlus
          size={25}
          onClick={onMore}
          className={value < 10 ? "hover:text-gradientPink" : "text-gray-400"}
        />
      </div>
    </div>
  );
};

const trimParagraph = (description) => {
  if (description?.length <= 300) {
    return description;
  }
  // Cut to 300 characters
  const trimmed = description?.slice(0, 300);

  // Find the last space to ensure we don't cut mid-word
  const lastSpaceIndex = trimmed.lastIndexOf(" ");
  if (lastSpaceIndex === -1) {
    // If no space is found, return an empty string
    return "";
  }

  // Trim to the last complete word
  return trimmed.slice(0, lastSpaceIndex);
};

// "use client";
// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import dynamic from "next/dynamic";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import moment from "moment";
// import Api from "@/api";

// // Lazy load components
// const ImageViewer = dynamic(() => import("@components/listing/imageViewer"), { ssr: false });
// const MapView = dynamic(() => import("@/components/map/input"), { ssr: false });
// const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

// const MyPage = ({ params }) => {
//   const { id } = params;

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [isDateOpen, setIsDateOpen] = useState(false);
//   const [isApplyEnabled, setIsApplyEnabled] = useState(false);
//   const [showMore, setShowMore] = useState(false); // State for "Show More" functionality
//   const mapRef = useRef();

//   const fetchProduct = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await Api.getListing(id);
//       if (!res?.error) {
//         setProduct(res?.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   const handleDateChange = useCallback(
//     (dates) => {
//       const [start, end] = Array.isArray(dates) ? dates : [dates];
//       setCheckIn(start);
//       setCheckOut(end);
//       setIsApplyEnabled(!!start && (!end || end));
//     },
//     []
//   );

//   const formattedDate = useMemo(
//     () =>
//       checkIn
//         ? moment(checkIn).format("LL") +
//           (checkOut ? ` - ${moment(checkOut).format("LL")}` : "")
//         : "Select dates",
//     [checkIn, checkOut]
//   );

//   return (
//     <section className="flex justify-center items-center bg-white">
//       <main className="container">
//         {/* Image Viewer */}
//         <ImageViewer
//           images={loading ? [1, 2, 3, 4, 5] : product?.images || []}
//           showMore={false}
//           loading={loading}
//         />

//         <div className="p-3">
//           {/* Product Details */}
//           <div className="flex flex-col lg:flex-row gap-6 pb-6 border-b border-gray-300">
//             <div className="w-full lg:w-7/12">
//               <div className=" mt-14">
//                 <h1 className="text-3xl font-bold text-black">
//                   {loading ? <Skeleton /> : product?.title}
//                 </h1>
//                 {!loading && product?.reviews && (
//                   <div className="flex items-center gap-4 mt-2">
//                     <span className="flex items-center text-yellow-500">
//                       ★ {product?.reviews?.score?.toFixed(1) || "N/A"}
//                     </span>
//                     <span>({product?.reviews?.count || 0} reviews)</span>
//                   </div>
//                 )}
//               </div>

//               {/* About Section */}
//               <div className="mt-6">
//                 <h3 className="text-2xl font-bold mb-2">About</h3>
//                 <p className="text-gray-700">
//                   {loading ? (
//                     <Skeleton count={10} />
//                   ) : (
//                     <>
//                       {showMore
//                         ? product?.description
//                         : product?.description?.slice(0, 300)}
//                     </>
//                   )}
//                 </p>
//                 {product?.description?.length > 300 && (
//                   <button
//                     className="text-pink-600 font-bold mt-2"
//                     onClick={() => setShowMore((prev) => !prev)}
//                   >
//                     {showMore ? "Show Less" : "Show More"}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Date Picker Section */}
//             <div className="w-full lg:w-5/12 bg-gray-100 p-4 rounded-lg shadow">
//               <div onClick={() => setIsDateOpen((prev) => !prev)}>
//                 <h2 className="text-lg font-bold mb-2">Select Dates</h2>
//                 <div className="flex items-center justify-between border p-2 rounded-lg bg-white cursor-pointer">
//                   <span>{formattedDate}</span>
//                   <span>📅</span>
//                 </div>
//               </div>
//               {isDateOpen && (
//                 <div className="relative mt-2">
//                   <DatePicker
//                     selected={checkIn}
//                     onChange={handleDateChange}
//                     startDate={checkIn}
//                     endDate={checkOut}
//                     selectsRange
//                     inline
//                   />
//                   <div className="flex justify-end gap-2 mt-2">
//                     <button
//                       className="px-4 py-2 text-sm text-gray-500"
//                       onClick={() => setIsDateOpen(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="px-4 py-2 text-sm text-white bg-pink-600 rounded-lg"
//                       disabled={!isApplyEnabled}
//                       onClick={() => setIsDateOpen(false)}
//                     >
//                       Apply
//                     </button>
//                   </div>
//                 </div>
//               )}
//               <button className="w-full py-3 mt-4 text-white bg-pink-500 rounded-lg">
//                 Book Now
//               </button>
//             </div>
//           </div>

//           {/* Map Section */}
//           {product?.location?.latitude && product?.location?.longitude && (
//             <div className="mt-6">
//               <h2 className="text-xl font-bold">Map Location</h2>
//               <MapView
//                 mapRef={mapRef}
//                 location={product?.location}
//                 height={"50vh"}
//                 editable={false}
//               />
//             </div>
//           )}
//         </div>
//       </main>
//     </section>
//   );
// };

// export default React.memo(MyPage);

// "use client";
// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import dynamic from "next/dynamic";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import moment from "moment";
// import Api from "@/api";

// // Lazy load components
// const ImageViewer = dynamic(() => import("@components/listing/imageViewer"), { ssr: false });
// const MapView = dynamic(() => import("@/components/map/input"), { ssr: false });
// const DatePicker = dynamic(() => import("react-datepicker"), { ssr: false });

// const MyPage = ({ params }) => {
//   const { id } = params;

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [isDateOpen, setIsDateOpen] = useState(false);
//   const [isApplyEnabled, setIsApplyEnabled] = useState(false);
//   const mapRef = useRef();

//   const fetchProduct = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await Api.getListing(id);
//       if (!res?.error) {
//         setProduct(res?.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   const handleDateChange = useCallback(
//     (dates) => {
//       const [start, end] = Array.isArray(dates) ? dates : [dates];
//       setCheckIn(start);
//       setCheckOut(end);
//       setIsApplyEnabled(!!start && (!end || end));
//     },
//     []
//   );

//   const formattedDate = useMemo(
//     () =>
//       checkIn
//         ? moment(checkIn).format("LL") +
//           (checkOut ? ` - ${moment(checkOut).format("LL")}` : "")
//         : "Select dates",
//     [checkIn, checkOut]
//   );

//   return (
//     <main className="container">
//       <ImageViewer
//         images={loading ? [1, 2, 3, 4, 5] : product?.images || []}
//         showMore={false}
//         loading={loading}
//       />

//       {/* Other content */}
//     </main>
//   );
// };

// export default React.memo(MyPage);
