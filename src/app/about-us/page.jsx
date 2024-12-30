"use client";
import { useAuth } from "@/hooks";
import useModals from "@/hooks/modal";
import { useRouter } from "next/navigation";
import React from "react";

const About = () => {
  const router = useRouter();
  const { isLoggedin } = useAuth();
  const { setRegister } = useModals();

  const features = [
    {
      title: "The Marketplace of Marketplaces",
      description:
        "Access a wide range of rentals from multiple platforms in one place.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.3323 14.667C29.3212 18.1676 29.2173 20.0583 28.2486 21.4418C27.8471 22.0151 27.3485 22.5138 26.7751 22.9152C25.2255 24.0003 23.0393 24.0003 18.667 24.0003H13.3337C8.96135 24.0003 6.7752 24.0003 5.22553 22.9152C4.6522 22.5138 4.15353 22.0151 3.75208 21.4418C2.66699 19.8921 2.66699 17.706 2.66699 13.3337C2.66699 8.96135 2.66699 6.7752 3.75208 5.22553C4.15353 4.6522 4.6522 4.15353 5.22553 3.75208C6.7752 2.66699 8.96135 2.66699 13.3337 2.66699H15.3337"
            stroke="#030712"
            strokeWidth="2.2"
            stroke-linecap="round"
          />
          <path
            d="M18.667 8.00033C18.667 8.00033 20.0003 8.00033 21.3337 10.667C21.3337 10.667 25.569 4.00033 29.3337 2.66699"
            stroke="#030712"
            strokeWidth="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.667 20H17.3337"
            stroke="#030712"
            strokeWidth="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M16 24V29.3333" stroke="#030712" strokeWidth="2.2" />
          <path
            d="M10.667 29.334H21.3337"
            stroke="#030712"
            strokeWidth="2.2"
            stroke-linecap="round"
          />
        </svg>
      ),
      // border: "border-pink-500"
    },
    {
      title: "One-Stop Solution",
      description:
        "Find lodging, vehicles, tools, and event spaces all on one convenient platform.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16.0003"
            cy="16.0003"
            r="13.3333"
            stroke="#1F2937"
            strokeWidth="2.2"
          />
          <path
            d="M12.667 12.667L17.3335 17.3332M21.3337 10.667L14.667 17.3337"
            stroke="#1F2937"
            strokeWidth="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      border: "",
    },
    {
      title: "Comprehensive Options",
      description:
        "We aggregate listings from top rental platforms, offering more choices and better deals.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9978 2.6665C11.9874 2.6665 9.38707 5.35849 6.31178 6.33971C5.06135 6.73868 4.43612 6.93816 4.1831 7.21937C3.93007 7.50058 3.85598 7.9115 3.70779 8.73335C2.12207 17.5278 5.58803 25.6585 13.8539 28.8231C14.742 29.1632 15.1861 29.3332 16.0021 29.3332C16.8182 29.3332 17.2622 29.1631 18.1503 28.8231C26.4156 25.6584 29.8783 17.5278 28.2921 8.73334C28.1439 7.91136 28.0697 7.50036 27.8167 7.21915C27.5636 6.93794 26.9384 6.73857 25.6881 6.33982C22.6116 5.3587 20.0083 2.6665 15.9978 2.6665Z"
            stroke="#1F2937"
            strokeWidth="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 17.3333C12 17.3333 13.3333 17.3333 14.6667 20C14.6667 20 18.902 13.3333 22.6667 12"
            stroke="#1F2937"
            strokeWidth="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      border: "",
    },
    {
      title: "Effortless Booking",
      description:
        "Say goodbye to juggling multiple tabs and hello to a streamlined rental experience.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.8218 26.6665H25.4754C27.0085 26.6665 28.2279 25.968 29.3228 24.9913C32.1044 22.5099 25.5658 19.9998 23.3337 19.9998M20.667 6.75819C20.9697 6.69814 21.2841 6.6665 21.6067 6.6665C24.0332 6.6665 26.0003 8.45736 26.0003 10.6665C26.0003 12.8756 24.0332 14.6665 21.6067 14.6665C21.2841 14.6665 20.9697 14.6349 20.667 14.5748"
            stroke="#1F2937"
            strokeWidth="2.2"
            stroke-linecap="round"
          />
          <path
            d="M5.97508 21.4814C4.40312 22.3238 0.281516 24.044 2.79185 26.1964C4.01812 27.2479 5.38388 27.9998 7.10096 27.9998H16.899C18.6161 27.9998 19.9819 27.2479 21.2082 26.1964C23.7185 24.044 19.5969 22.3238 18.0249 21.4814C14.3387 19.506 9.66132 19.506 5.97508 21.4814Z"
            stroke="#1F2937"
            strokeWidth="2.2"
          />
          <path
            d="M17.3333 9.99984C17.3333 12.9454 14.9455 15.3332 12 15.3332C9.05448 15.3332 6.66667 12.9454 6.66667 9.99984C6.66667 7.05432 9.05448 4.6665 12 4.6665C14.9455 4.6665 17.3333 7.05432 17.3333 9.99984Z"
            stroke="#1F2937"
            strokeWidth="2.2"
          />
        </svg>
      ),
      border: "",
    },
    {
      title: "A Better Search",
      description:
        "Discover a smarter, easier way to find your perfect rental across categories with P33R.",
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.8218 26.6665H25.4754C27.0085 26.6665 28.2279 25.968 29.3228 24.9913C32.1044 22.5099 25.5658 19.9998 23.3337 19.9998M20.667 6.75819C20.9697 6.69814 21.2841 6.6665 21.6067 6.6665C24.0332 6.6665 26.0003 8.45736 26.0003 10.6665C26.0003 12.8756 24.0332 14.6665 21.6067 14.6665C21.2841 14.6665 20.9697 14.6349 20.667 14.5748"
            stroke="#1F2937"
            strokeWidth="2.2"
            stroke-linecap="round"
          />
          <path
            d="M5.97508 21.4814C4.40312 22.3238 0.281516 24.044 2.79185 26.1964C4.01812 27.2479 5.38388 27.9998 7.10096 27.9998H16.899C18.6161 27.9998 19.9819 27.2479 21.2082 26.1964C23.7185 24.044 19.5969 22.3238 18.0249 21.4814C14.3387 19.506 9.66132 19.506 5.97508 21.4814Z"
            stroke="#1F2937"
            strokeWidth="2.2"
          />
          <path
            d="M17.3333 9.99984C17.3333 12.9454 14.9455 15.3332 12 15.3332C9.05448 15.3332 6.66667 12.9454 6.66667 9.99984C6.66667 7.05432 9.05448 4.6665 12 4.6665C14.9455 4.6665 17.3333 7.05432 17.3333 9.99984Z"
            stroke="#1F2937"
            strokeWidth="2.2"
          />
        </svg>
      ),
      border: "",
    },
  ];
  return (
    <div className="bg-white text-gray-800 py-10 px-6">
      <section className="container mx-auto">
        {/* About Section */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-extrabold font-[inter-s]">About P33R</h1>
          <p className="mt-4 text-[#374151] font-[inter-r]">
            At P33R, we’re revolutionizing the way people find and book
            peer-to-peer rentals. Whether you’re looking for a vacation home, a
            car, a boat, or any other shared asset, we bring together the best
            options from trusted platforms - all in one place.{" "}
            <strong>
              {" "}
              Our mission is to simplify the rental experience, saving you time,
              effort, and money. Marketplace of Marketplaces
            </strong>
          </p>
          <p className="mt-4 text-[#374151] font-[inter-r]">
            Just like how Kayak transformed travel bookings, P33R does the same
            for peer-to-peer rentals,{" "}
            <strong>
              {" "}
              allowing users to compare multiple options, find the best deals,
              and make informed decisions quickly and easily.
            </strong>{" "}
            No more switching between tabs or apps—P33R gives you a seamless
            experience across categories, helping you find exactly what you need
            in just a few clicks.
          </p>
        </div>

        {/* Image Section */}
        <div className="mb-8">
          <img
            src="/assets/about/back.jpg"
            alt="Beautiful scenery"
            className="rounded-lg w-full h-[50vh] object-cover"
          />
        </div>

        {/* Vision and Mission */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-xl font-[inter-s] mb-2">Our Vision</h2>
            <p className="text-[#374151] font-[inter-r]">
              To become the ultimate hub for peer-to-peer rentals, empowering
              individuals to access and share assets in the most convenient,
              transparent, and cost-effective way.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-[inter-s] mb-2">Our Mission</h2>
            <p className="text-[#374151] font-[inter-r]">
              We aim to simplify and enhance the peer-to-peer rental market by
              providing a unified platform that allows users to explore
              exceptional options across a variety of products.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white container ">
        <div className=" mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold  mt-12">Why Choose P33R</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 pt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`border rounded-lg p-6 shadow-md hover:shadow-md hover:border-pink-500 ${feature.border}`}
              >
                <div className="flex items-center justify-center mb-4 icon-hover">
                  {feature.icon}
                </div>
                <h3 className="text-lg mb-2 font-bold">{feature.title}</h3>
                <p className="text-[#374151] font-[inter-r]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto mb-5">
        <p className="mt-4 text-[#374151] font-[inter-r] mb-10">
          Whether you’re looking for a cozy weekend getaway, a vehicle for your
          next adventure, or equipment for a project, P33R has you covered. Our
          platform connects you to unique and trusted rental experiences, making
          it simple to find exactly what you need.
        </p>
      </section> */}
      <section className="relative bg-gray-800 text-white rounded-2xl container">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl "
          style={{
            backgroundImage: `url('assets/section.png')`, // Replace with your actual image URL
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl "></div>

        {/* Content */}
        <div className="relative max-w-4xl  px-16 py-20 lg:py-32 text-start ">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Your Journey
          </h2>
          <p className="text-md text-[#D1D5DB] lg:text-xl mb-8">
            Join countless renters who trust P33R for effortless peer-to-peer
            bookings— from vacations to car rentals, it’s all here.
          </p>
          <button
            onClick={() =>
              isLoggedin ? router.push("/profile") : setRegister(true)
            }
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
