import React from "react";

const BlogPage = () => {
  return (
    <div className=" min-h-screen py-10 px-6 font-[inter-r]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col text-center">
          <h2 className="text-[#D855A0] text-[16px] font-bold uppercase font-[inter-s] tracking-widest">
            About Us
          </h2>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2 font-[inter-r]">
            Discover the Magic of <br /> Traveling Like a Local “P33R”
          </h1>
          <p className="text-gray-500 text-sm mt-4">
            October 19, 2024 · 14 min read
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-10 mt-5">
          <img
            src="/assets/blogs/12.png"
            alt="Travel Hero"
            className="rounded-lg shadow-lg w-full object-cover h-[300px] sm:h-[400px]"
          />
        </div>

        {/* Content */}
        <section className=" flex flex-col items-center justify-center">
          <div className="max-w-[792px]">
            {" "}
            {/* Paragraph */}
            <p className="text-[#374151] leading-relaxed font-[inter-r] text-[16px] mb-6">
              Travel isn&apos;t just about visiting new places; it&apos;s about
              connecting with cultures, people, and experiences that make those
              destinations unforgettable. At Airbnb, we believe in creating
              those authentic moments, where every stay feels like home—only
              better. Here&apos;s why choosing Airbnb can redefine the way you
              explore the world.
            </p>
            {/* Sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 font-[inter-s]">
                  1. Stays That Tell a Story
                </h3>
                <p className="text-[#374151] mt-2 font-[inter-r] text-[16px]">
                  Every Airbnb is unique. From cozy cottages in the countryside
                  to sleek urban lofts, our listings are more than just places
                  to sleep—they&apos;re a part of the adventure. Whether
                  it&apos;s a treehouse nestled in the forest or a beachfront
                  bungalow with sunrise views, each space offers a distinct vibe
                  and connection to the local culture.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 font-[inter-s]">
                  2. Hosts Who Share Their World
                </h3>
                <p className="text-[#374151] mt-2 font-[inter-r] text-[16px]">
                  Behind every Airbnb stay is a host who&apos;s passionate about
                  sharing their space and stories. Hosts provide insider tips,
                  from the best hole-in-the-wall cafés to hidden hiking trails,
                  making it easier to explore beyond the tourist traps. Many go
                  above and beyond, offering local delicacies, curated
                  experiences, or simply warm hospitality.
                </p>
                <div className="md:flex-row flex gap-4  mt-4 flex-col">
                  <img
                    src="/assets/blogs/1.png"
                    alt="House"
                    className="rounded-lg shadow-md object-cover"
                  />
                  <img
                    src="/assets/blogs/123.png"
                    alt="Boat"
                    className="rounded-lg shadow-md object-cover pt-3 md:pt-0"
                  />
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 font-[inter-s]">
                  3. Experiences That Spark Joy
                </h3>
                <p className="text-[#374151] mt-2 font-[inter-r] text-[16px]">
                  Airbnb isn&apos;t just about where you stay—it&apos;s about
                  what you do. Through Airbnb Experiences, you can dive deeper
                  into the culture of your destination. Learn pasta-making in a
                  Roman kitchen, explore secret gardens with a horticulturist,
                  or paddleboard at sunrise in Bali. Every experience is hosted
                  by experts eager to share their passions.
                </p>
                <p className="text-[#374151] mt-2">
                  <strong>Eligibility:</strong> You must be at least 18 years
                  old to use the Platform.
                  <br />
                  <strong>License:</strong> P33R.com grants you a limited,
                  non-exclusive, non-transferable, revocable license to use the
                  Platform for personal, non-commercial use.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 font-[inter-s]">
                  4. Travel That Fits Your Lifestyle
                </h3>
                <p className="text-[#374151] mt-2 font-[inter-r] text-[16px]">
                  Solo adventurers, families, digital nomads, and luxury seekers
                  alike can find their perfect match on Airbnb. Looking for a
                  work-from-anywhere setup? Check out listings with strong Wi-Fi
                  and dedicated workspaces. Traveling with kids? Opt for
                  family-friendly homes with plenty of space to play. Whatever
                  your travel needs, we&apos;ve got you covered.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 font-[inter-s]">
                  5. Sustainable Stays for a Better Tomorrow
                </h3>
                <p className="text-[#374151] mt-2 font-[inter-r] text-[16px]">
                  We care about the planet as much as you do. Many Airbnb stays
                  feature sustainable practices, from solar-powered homes to
                  eco-friendly amenities. By staying in local homes, you&apos;re
                  also contributing to the local economy and fostering a sense
                  of community wherever you go.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
