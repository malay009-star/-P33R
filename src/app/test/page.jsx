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
import ListingBoat from "/public/assets/listingBoat.png";

import { GiFishingBoat } from "react-icons/gi";
import { Heart } from "lucide-react";

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

  const [Active, setActiveTab] = useState(false);

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
      images: "/assets/listingBoat.png",
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
      images: "/assets/listingBoat.png",
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
      images: "/assets/listingBoat.png",
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
      images: ["/assets/listingBoat.png"],
    },
  ];

  const mapLink =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617541157579!2d-73.98823932415527!3d40.748440471388136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2s!4v1733216015734!5m2!1sen!2s";

  return (
    <div className="bg-white">
      <div className="flex relative flex-col text-white ">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          // playbackRate={0.25}
          className="background-video absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/home_back.mp4" type="video/mp4" />
        </video>
        <div className="overlay absolute top-0 left-0 w-full h-full"></div>
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
          <Categories setActiveTab={setActiveTab} />

          {Active && (
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
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 container !mt-8">
        <div>
          <div className="grid grid-cols-1 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="border rounded-lg overflow-hidden flex p-2"
              >
                <div className="w-2/5">
                  <img
                    src={listing.images}
                    alt={listing.name}
                    className="w-full h-40 rounded-md"
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
                    <div className="flex items-center text-sm font-medium gap-1">
                      <span>⭐ {listing.rating}</span>
                      <span>({listing.reviews})</span>
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
        <iframe
          src={mapLink}
          width="100%"
          height="480"
          style={{ border: 0, borderRadius: 10 }}
          allowFullScreen="true"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
