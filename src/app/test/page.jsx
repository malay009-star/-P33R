"use client";
import "./page.css";

import moment from "moment";

import React, { useEffect, useRef, useState } from "react";

import Api from "@/api";
import Footer from "@components/footer2";
import Categories from "@components/categories";
import Filter from "@components/filterlist";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/spinner";

const LandingPage = () => {
  const router = useRouter();
  const videoRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Ensure the playback rate is set after the video is loaded
      const setPlaybackRate = () => {
        video.playbackRate = 0.25;
      };

      // Add event listener to ensure it's applied when metadata is loaded
      video.addEventListener("loadedmetadata", setPlaybackRate);

      // Cleanup event listener
      return () => {
        video.removeEventListener("loadedmetadata", setPlaybackRate);
      };
    }
  }, []);

  const getCategories = async () => {
    const res = await Api.getCategories(setLoading);
    if (res?.error) return;
    setCategories(res?.data);

    if (res?.data?.length > 0) {
      setCategory(res?.data[0]?.slug);
    }
  };

  const handleSearch = async () => {
    if (
      !category &&
      Object.keys(location).length === 0 &&
      // !location &&
      !address &&
      !startDate &&
      !endDate &&
      !query
    ) {
      toast.error("Please filled atleast one field!");
      return;
    }

    let q = "?";

    if (query) {
      q = q + `q=${query}&`;
    }

    if (location?.latitude && location?.longitude) {
      q = q + `lat=${location.latitude}&lng=${location.longitude}&`;
    }

    if (address) {
      q = q + `address=${address}&`;
    }

    if (startDate) {
      q = q + `startDate=${moment(startDate).format("YYYY-MM-DD")}&`;
    }

    if (endDate) {
      q = q + `endDate=${moment(endDate).format("YYYY-MM-DD")}&`;
    }

    if (category) {
      const cid = categories.find((c) => c.slug === category);

      q = q + `category=${category}&cid=${cid?.id}&`;
    }

    if (q.endsWith("&")) {
      q = q.slice(0, -1);
    }

    if (q.endsWith("?")) {
      q = q.slice(0, -1);
    }

    router.push("/search" + q);
  };

  if (loading) {
    return <LoadingSpinner asOverlay />;
  }

  return (
    <div className="bg1 min-h-screen flex flex-col text-white overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        // playbackRate={0.25}
        className="background-video fixed top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/home_back.mp4" type="video/mp4" />
      </video>
      <div className="overlay  fixed top-0 left-0 w-full h-full"></div>
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center  px-6 py-10 text-center relative z-10 pt-[64px]">
        <h1 className="top-heading md:text-[56px] text-[32px] font-[inter-r]  font-semibold text-white mb-4 leading-[62.72px]">
          Search. <span className="text-pink-500">Compare.</span> Rent.
        </h1>
        <p className="top-para text-sm md:text-lg text-white  max-w-[663px]  text-[16px] font-[inter-r] font-normal mb-6 leading-[24.96px]">
          P33R is your go-to destination for peer-to-peer rentals.
          <span className="text-white font-semibold ">
            {" "}
            We partner with leading peer-to-peer platforms to offer a vast
            selection of rentals.
          </span>
        </p>
        <button className="text-white text-[18px] leading-[28.08px] font-[inter-r] font-bold pt-[28px]">
          Choose Category
        </button>

        <Categories
          categories={categories}
          selectedCategory={category}
          setCategory={setCategory}
        />
        <Filter
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
        />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
