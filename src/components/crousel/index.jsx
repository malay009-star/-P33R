import React from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

const ImageCarousel = ({ images, loading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Custom Arrows
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        onClick={onClick}
      >
        ➡️
      </button>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        onClick={onClick}
      >
        ⬅️
      </button>
    );
  };

  return (
    <div className="relative rounded-[10px] h-[150px] w-[250px] overflow-hidden">
      {loading ? (
        <Skeleton height={"100%"} />
      ) : (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                className="w-full h-full object-cover bg-slate-100"
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ImageCarousel;
