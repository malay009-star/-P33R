"use client";
import "./search.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { IoStarSharp } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { IoMdArrowRoundUp } from "react-icons/io";
import Image from "next/image";
import { debounce } from "lodash";

import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Api from "@/api";
import { useAuth } from "@/hooks";
import LoadingSpinner from "@/components/spinner";
import FilterList from "@components/filterlist";

// Lazy load components
const MapView = lazy(() => import("@/components/map"));
const AdvanceFilter = lazy(() => import("./AdvanceFilter"));
const Breadcrumb = lazy(() => import("@components/breadcrum"));

function SearchListPage({ initialProducts = [] }) {
  const router = useRouter();
  const search = useSearchParams();
  const { wishlist, toggleWishlist, categories } = useAuth();

  const category = search.get("cid") || "";
  const sentinelRef = useRef(null);

  const [initLoading, setInitLoading] = useState(true);

  const [location, setLocation] = useState({
    lat: search.get("lat") || "",
    lng: search.get("lng") || "",
  });
  const [address, setAddress] = useState(search.get("address") || "");
  const [startDate, setStartDate] = useState(search.get("startDate") || "");
  const [endDate, setEndDate] = useState(search.get("endDate") || "");
  const [query, setQuery] = useState(search.get("q") || "");

  const [products, setProducts] = useState(initialProducts);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [locationData, setLocationData] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 200,
    applied: false,
  });

  const observer = useMemo(() => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      return new IntersectionObserver(
        ([entry]) => setIsVisible(!entry.isIntersecting),
        {
          root: null,
          threshold: 0.1,
        }
      );
    }
    return null;
  }, []);

  useEffect(() => {
    if (observer) {
      const currentRef = sentinelRef.current;
      if (currentRef) observer.observe(currentRef);

      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [observer]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
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
      setLocationData({
        lat: 40.7128,
        lng: -74.006,
      });
    }
  };

  const getProducts = debounce(async () => {
    setLoading(true);
    let body = {};

    if (category) body.product_category = category == 3 ? 2 : category;
    if (location.lat && location.lng) {
      body.latitude = location.lat;
      body.longitude = location.lng;
    }
    if (address) body.address = address;
    if (startDate) body.start_date = startDate;
    if (endDate) body.end_date = endDate;
    if (query) body.query = query;
    if (price.applied) {
      body.min = price.minPrice;
      body.max = price.maxPrice;
    }

    const res = await Api.searchListings("", body);
    setInitLoading(false);

    if (res?.error || res?.data?.error) {
      setProducts([]);
    } else {
      setProducts(res.data);
      setTotalPages(res?.meta?.last_page);
      setCurrentPage(res?.meta?.current_page);
    }
    setLoading(false);
  }, 300);

  useEffect(() => {
    getUserLocation();
    getProducts();
  }, []);

  useEffect(() => {
    if (!price.applied) return;
    getProducts();
  }, [price?.minPrice, price?.maxPrice]);

  const handleSearch = useCallback(() => {
    getProducts();
  }, [category, location, address, startDate, endDate, query, price]);

  const loadMorePoroducts = async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    let body = {
      page: currentPage + 1,
    };

    if (category) body.product_category = category == 3 ? 2 : category;
    if (location.lat && location.lng) {
      body.latitude = location.lat;
      body.longitude = location.lng;
    }
    if (address) body.address = address;
    if (startDate) body.start_date = startDate;
    if (endDate) body.end_date = endDate;
    if (query) body.query = query;
    if (price.applied) {
      body.min = price.minPrice;
      body.max = price.maxPrice;
    }

    const res = await Api.searchListings("", body);

    if (res?.error || res?.data?.error) {
      setProducts([]);
    } else {
      setProducts([...products, ...res.data]);
      setTotalPages(res?.meta?.last_page);
      setCurrentPage(res?.meta?.current_page);
    }

    setLoadingMore(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Search", path: "/search" },
    category && {
      label: categories?.find((c) => c?.id == category)?.name,
      path: "/",
    },
  ].filter(Boolean);

  return (
    <React.Fragment>
      {initLoading && <LoadingSpinner asOverlay />}
      <div ref={sentinelRef}></div>
      <div className="flex flex-col relative overflow-hidden">
        {isVisible && (
          <a
            onClick={scrollToTop}
            className="bg-[#f066b5] w-[35px] h-[35px] fixed bottom-3 right-4 z-10 flex items-center justify-center rounded-[8px] cursor-pointer"
          >
            <IoMdArrowRoundUp color="white" />
          </a>
        )}
        <div className="filter-list container">
          <FilterList
            category={category}
            location={location}
            address={address}
            startDate={startDate}
            endDate={endDate}
            query={query}
            setLocation={setLocation}
            setAddress={setAddress}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setQuery={setQuery}
            handleSearch={handleSearch}
            isAbsolute={true}
            isSearch={true}
          />
        </div>
        <div className="mobile py-6 flex flex-col gap-6 px-4 md:px-6 md:config md:sticky md:top-0 bg-white">
          <div className="container">
            <Suspense fallback={<LoadingSpinner />}>
              <Breadcrumb items={breadcrumbItems} />
              <AdvanceFilter price={price} setPrice={setPrice} />
            </Suspense>
          </div>
          <div className="container flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col items-center my-4 lg:w-[50%]">
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <Skeleton key={idx} height={"150px"} width={"100%"} />
                ))
              ) : (
                <InfiniteScroll
                  dataLength={products.length}
                  next={loadMorePoroducts}
                  hasMore={
                    !loadingMore && Number(currentPage) < Number(totalPages)
                  }
                  loader={
                    <div className="flex flex-col items-center">
                      <p className="text-[#1F1C1E] font-manrope text-2xl text-center">
                        Loading...
                      </p>
                    </div>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <div className="flex flex-col gap-4 items-center w-full ">
                    {products.map((item, index) => {
                      const inWishlist = wishlist.findIndex(
                        (wsh) =>
                          item.id ==
                          (item?.isAffiliate
                            ? wsh.affiliate_product_id
                            : wsh.product_id)
                      );

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            let q = "?";

                            if (startDate) {
                              q = q + `startDate=${startDate}&`;
                            }

                            if (endDate) {
                              q = q + `endDate=${endDate}`;
                            }

                            router.push(`/listing/${item?.id}` + q);
                          }}
                          className="shadow-add relative flex justify-start items-start gap-4 w-full border border-[#E0E0E0] rounded-[20px] p-2 flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap cursor-pointer"
                        >
                          <div className="relative rounded-[10px] h-[150px] w-full md:w-[250px] overflow-hidden">
                            <Image
                              src={item?.merchant_image_url || ""}
                              alt="profile"
                              fill
                              className="w-full h-full object-cover bg-slate-100"
                              priority={index === 0}
                              loading={index === 0 ? "eager" : "lazy"}
                            />
                          </div>
                          <div className="flex flex-col justify-between items-start w-full h-full">
                            <div className="flex gap-6 justify-between items-start w-full flex-wrap">
                              <div className="flex flex-col gap-3 flex-1">
                                <p className="text-[#1F1C1E] font-medium leading-normal text-[18px] pr-8 font-[inter-s]">
                                  {item?.title}
                                </p>
                                <div className="flex flex-col gap-1 text-[#535052] text-sm font-[inter-r]">
                                  <p>
                                    {item?.city && item?.city !== "null"
                                      ? item?.city + ", "
                                      : ""}
                                    {item?.state && item?.state !== "null"
                                      ? item?.state + ", "
                                      : ""}
                                    {item?.country}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="bg-[#fff] rounded-full p-[5px] text-xl absolute top-3 right-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWishlist({
                                    _id: item?.id,
                                    is_affiliated: item?.isAffiliate,
                                    product_id: item?.id,
                                    affiliate_product_id: item?.id,
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
                            <div className="flex gap-6 items-center justify-between w-full">
                              <div className="flex gap-2 items-center">
                                <IoStarSharp
                                  className={
                                    item.rating
                                      ? "text-[#FFB800]"
                                      : "text-gray-500"
                                  }
                                />
                                <p
                                  className={
                                    item.rating
                                      ? "text-[#1F1C1E]"
                                      : "text-gray-500"
                                  }
                                >
                                  {item.rating
                                    ? item.rating > 5
                                      ? Number(item.rating / 20).toFixed(1)
                                      : Number(item.rating).toFixed(1)
                                    : ""}

                                  {item.affiliate_name && (
                                    <span className="text-[#535052] text-sm font-[inter-r]">
                                      {" "}
                                      ({item.affiliate_name})
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="flex gap-2 items-center">
                                <p className="font-medium text-[#1F1C1E] text-[18px] leading-normal font-[inter-s]">
                                  ${Math.ceil(item?.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              )}
              {products?.length === 0 && (
                <div className="flex flex-col items-center">
                  <div className="relative w-[300px] h-[300px]">
                    <Image
                      src="/assets/no-data.jpg"
                      alt="no-listing"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="text-[#1F1C1E] font-manrope text-2xl text-center">
                    No listings found
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center">
                  <p className="text-[#1F1C1E] font-manrope text-2xl text-center">
                    Loading...
                  </p>
                </div>
              )}
            </div>
            <div className="lg:w-[50%]">
              <Suspense fallback={<LoadingSpinner />}>
                <MapView
                  location={locationData}
                  products={loading ? [] : products}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchListPage;
