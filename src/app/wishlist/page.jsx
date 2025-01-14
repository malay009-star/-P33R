"use client";
import "../globals.css";

import { IoStarSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import MapView from "@/components/map";

import Api from "@/api";
import { useAuth } from "@/hooks";
import Skeleton from "react-loading-skeleton";
import EmptyWhishlist from "@/components/wishlist/emptyWhishlistComponent";

function SearchListPage() {
  const router = useRouter();
  const { wishlist, toggleWishlist } = useAuth();
  const [locationData, setLocationData] = useState("");
  const [products, setProducts] = useState([{}, {}, {}, {}, {}, {}]);
  const [cLoading, setCLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        setLocationData({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        return;
      });

      setLocationData({
        lat: 40.7128,
        lng: -74.006,
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocationData({
        lat: 40.7128,
        lng: -74.006,
      });
    }
  };

  const getProducts = async () => {
    const res = await Api.getWishlistProducts(setLoading);

    if (res?.error) return setProducts([]);

    setProducts((prev) => res.data);
  };

  useEffect(() => {
    getProducts();
    getUserLocation();
  }, []);

  return (
    <>
      <div className=" flex flex-col">
        <div className="py-6 flex flex-col gap-6  px-4 md:px-6 md:sticky md:top-0 bg-white">
          {products && products.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-6">
              <div className="flex flex-col gap-4 justify-center items-center my-4 lg:w-[50%] ">
                {products.map((item, index) => {
                  const data = item;
                  const inWishlist = wishlist.findIndex(
                    (wsh) =>
                      wsh.affiliate_product_id == item?.affiliate_product_id ||
                      wsh.product_id == item?.id
                  );

                  return (
                    <div
                      key={index}
                      onClick={() =>
                        router.push(
                          `/listing/${
                            item?.affiliate_id
                              ? item?.affiliate_product_id
                              : item?.id
                          }`
                        )
                      }
                      className={`shadow-add relative flex justify-start items-start gap-4 w-full border border-[#E0E0E0]  rounded-[20px] p-2 flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap cursor-pointer `}
                    >
                      {/* saud replace this till line 249 with Crousel component */}
                      <div className="relative rounded-[10px] h-[150px] w-[250px] overflow-hidden">
                        {loading ? (
                          <Skeleton height={"100%"} />
                        ) : (
                          <Image
                            src={
                              data?.merchant_image_url
                                ? data?.merchant_image_url
                                : ""
                            }
                            alt="profile"
                            fill
                            className="w-full h-full object-cover bg-slate-100"
                            priority={index === 0}
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-between items-start w-full h-full">
                        <div className="flex gap-6 justify-between items-start w-full flex-wrap">
                          <div className="flex flex-col gap-3 justify-start items-star flex-1">
                            {loading ? (
                              <Skeleton />
                            ) : (
                              <p className="text-[#1F1C1E] font-medium leading-normal text-lg">
                                {data?.title}
                              </p>
                            )}
                            {loading ? (
                              <Skeleton />
                            ) : (
                              <div className="flex flex-col gap-1 justify-start items-start text-[#535052] text-sm leading-normal">
                                {data?.city && (
                                  <p>
                                    {data?.city}, {data?.state}, {data?.country}
                                  </p>
                                )}
                                {/* <p>{item?.date}</p> */}
                              </div>
                            )}
                          </div>
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <div className="flex justify-end gap-2 ">
                              <button
                                className="bg-[#fff] rounded-full p-[5px] text-xl absolute top-3 right-3"
                                onClick={(e) => {
                                  e.stopPropagation();

                                  toggleWishlist({
                                    _id: item?.isAffiliate
                                      ? item?.affiliate_product_id
                                      : item?.id,
                                    is_affiliated: item?.isAffiliate,
                                    product_id: item?.id,
                                    affiliate_product_id:
                                      item?.affiliate_product_id,
                                  });
                                }}
                              >
                                {inWishlist >= 0 ? (
                                  <FaHeart className="text-[#D750A0]" />
                                ) : (
                                  <FaRegHeart className="text-[#1F1C1E]" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-6 justify-between items-center w-full">
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <div className="flex gap-2 items-center">
                              <IoStarSharp
                                className={
                                  item.rating
                                    ? " text-[#FFB800]"
                                    : " text-gray-500"
                                }
                              />
                              <p
                                className={
                                  "font-Manrope text-base font-normal leading-normal " +
                                  (item?.rating
                                    ? "text-[#1F1C1E]"
                                    : " text-gray-500")
                                }
                              >
                                {item.rating
                                  ? item.rating > 5
                                    ? Number(item.rating / 20).toFixed(1)
                                    : Number(item.rating).toFixed(1)
                                  : ""}
                              </p>
                            </div>
                          )}
                          {loading ? (
                            <Skeleton width={100} />
                          ) : (
                            <div className="flex gap-2 justify-start items-center">
                              <p className="font-medium text-[#1F1C1E] text-[20px] leading-normal">
                                ${Math.ceil(data?.price)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="lg:w-[50%]">
                <MapView location={locationData} />
              </div>
            </div>
          ) : (
            <EmptyWhishlist />
          )}
        </div>
      </div>
    </>
  );
}

export default SearchListPage;
