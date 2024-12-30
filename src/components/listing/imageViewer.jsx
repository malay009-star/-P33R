// "use client";
// import "react-loading-skeleton/dist/skeleton.css";
// import "./index.css";

// import React, { useEffect, useState } from "react";

// import Skeleton from "react-loading-skeleton";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import Image from "next/image";

// export default function ImageViewer({ images = [], showMore = true, loading }) {
//   const [show, setShow] = useState(false);
//   const [selected, setSelected] = useState(0);
//   const [fade, setFade] = useState(false);

//   useEffect(() => {
//     if (show) {
//       document.body.style.overflow = "hidden";

//       // Add keydown event listener for keyboard navigation
//       const handleKeyDown = (e) => {
//         if (e.key === "ArrowLeft") handlePrev();
//         if (e.key === "ArrowRight") handleNext();
//       };
//       window.addEventListener("keydown", handleKeyDown);

//       return () => {
//         document.body.style.overflow = "unset";
//         window.removeEventListener("keydown", handleKeyDown);
//       };
//     }
//   }, [show]);

//   const handlePrev = () => {
//     setFade(true);
//     setTimeout(() => {
//       setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//       setFade(false);
//     }, 300);
//   };

//   const handleNext = () => {
//     setFade(true);
//     setTimeout(() => {
//       setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//       setFade(false);
//     }, 300);
//   };

//   return (
//     <div
//       className={
//         "bg-slate-100 grid grid-cols-1 p-5 md:p-2 gap-2 my-2 " +
//         getClassName(images)
//       }
//     >
//       <div
//         className={
//           "cursor-pointer " +
//           (images.length >= 1 && "md:col-span-2 h-[30vh] md:h-[50vh]")
//         }
//         onClick={() => setShow(true)}
//       >
//         <Card loading={loading} image={images[0]} />
//       </div>
//       {images.length > 4 && (
//         <div
//           className="cursor-pointer flex md:flex-col gap-2 h-[25vh] md:h-[50vh] "
//           onClick={() => setShow(true)}
//         >
//           <Card loading={loading} image={images[3]} />
//           <Card loading={loading} image={images[4]} />
//         </div>
//       )}
//       {images.length >= 2 && (
//         <div
//           className={
//             "flex md:flex-col h-[25vh] md:h-[50vh] relative cursor-pointer " +
//             (images.length > 2 && "gap-2")
//           }
//           onClick={() => setShow(true)}
//         >
//           <Card loading={loading} image={images[1]} />
//           {loading ? (
//             <Card loading={true} />
//           ) : (
//             images.length > 2 && (
//               <div
//                 className="h-full w-full flex justify-center items-center cursor-pointer"
//                 style={{
//                   background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${images[2]})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               >
//                 <p className="text-white font-manrope">
//                   See all {images.length} images
//                 </p>
//               </div>
//             )
//           )}
//         </div>
//       )}

//       {show && (
//         <div className="h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.9)] z-[1000] p-5 flex flex-col justify-between">
//           <IoIosCloseCircleOutline
//             size={42}
//             className="absolute top-5 right-5 cursor-pointer text-red-700 z-10"
//             onClick={() => setShow(false)}
//           />
//           <div className="relative flex justify-center items-center h-[75vh]">
//             <FaArrowLeft
//               size={40}
//               className="absolute left-5 cursor-pointer text-white hover:bg-white hover:text-black rounded-full p-2 transition-all duration-300"
//               onClick={handlePrev}
//             />
//             <img
//               src={images[selected]}
//               className={`h-full w-auto object-contain transition-opacity duration-300 ${
//                 fade ? "opacity-0" : "opacity-100"
//               }`}
//             />
//             <FaArrowRight
//               size={40}
//               className="absolute right-5 cursor-pointer text-white hover:bg-white hover:text-black rounded-full p-2 transition-all duration-300"
//               onClick={handleNext}
//             />
//           </div>
//           <div className="flex gap-2 overflow-scroll image-viewer-scroll">
//             {images.map((image, index) => (
//               <img
//                 src={image}
//                 className={`h-[100px] w-full object-contain cursor-pointer ${
//                   selected === index ? "border-2 border-white" : ""
//                 }`}
//                 key={image + index}
//                 onClick={() => setSelected(index)}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const getClassName = (images) => {
//   if (images.length > 4) return "md:grid-cols-4";
//   if (images.length >= 2) return "md:grid-cols-3";
//   return "grid-cols-1 p-2";
// };

// const Card = ({ image = "", loading }) => {
//   return (
//     <div
//       className="h-full w-full"
//       style={{
//         // backgroundImage: `url(${image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {loading ? (
//         <Skeleton height="100%" />
//       ) : (
//         <Image
//           src={image}
//           width={0}
//           height={0}
//           sizes="100vw"
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       )}
//     </div>
//   );
// };

"use client";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import React, { useEffect, useState, memo, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

// Memoize the ImageViewer component to prevent unnecessary re-renders
const ImageViewer = memo(({ images = [], showMore = true, loading }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
      const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset"; // Restore scroll when modal is closed
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [show]);

  const handlePrev = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(false);
    }, 300);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setFade(true);
    setTimeout(() => {
      setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFade(false);
    }, 300);
  }, [images.length]);

  return (
    <div
      className={`bg-slate-100 grid grid-cols-1 p-5 md:p-2 gap-2 my-2 ${getClassName(
        images
      )}`}
    >
      {/* First image in grid */}
      <div
        className={`cursor-pointer ${
          images.length >= 1 &&
          "md:col-span-2 h-[30vh] md:h-[50vh] overflow-hidden"
        }`}
        onClick={() => setShow(true)}
      >
        <Card loading={loading} image={images[0]} preload />
      </div>

      {/* Display more images if available */}
      {images.length > 4 && (
        <div
          className="cursor-pointer flex md:flex-col gap-2 h-[25vh] md:h-[50vh] overflow-hidden"
          onClick={() => setShow(true)}
        >
          <Card loading={loading} image={images[3]} preload />
          <Card loading={loading} image={images[4]} preload />
        </div>
      )}

      {/* Second set of images */}
      {images.length >= 2 && (
        <div
          className={`flex md:flex-col h-[25vh] md:h-[50vh] relative cursor-pointer overflow-hidden ${
            images.length > 2 ? "gap-2" : ""
          }`}
          onClick={() => setShow(true)}
        >
          <Card loading={loading} image={images[1]} preload />
          {loading ? (
            <Card loading={true} />
          ) : (
            images.length > 2 && (
              <div
                className="h-full w-full flex justify-center items-center cursor-pointer"
                style={{
                  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${images[2]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="text-white font-manrope">
                  See all {images.length} images
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Modal to view full images */}
      {show && (
        <div className="h-screen fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.9)] z-[1000] p-5 flex flex-col justify-between">
          <IoIosCloseCircleOutline
            size={42}
            className="absolute top-5 right-5 cursor-pointer text-red-700 z-10"
            onClick={() => setShow(false)}
          />
          <div className="relative flex justify-center items-center h-[75vh]">
            <FaArrowLeft
              size={40}
              className="absolute left-5 cursor-pointer text-white bg-[rgba(0,0,0,0.5)] hover:bg-white hover:text-black rounded-full p-2 transition-all duration-300"
              onClick={handlePrev}
            />
            <img
              src={images[selected]}
              className={`h-full w-auto object-contain transition-opacity duration-300 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            />
            <FaArrowRight
              size={40}
              className="absolute right-5 cursor-pointer text-white bg-[rgba(0,0,0,0.5)] hover:bg-white hover:text-black rounded-full p-2 transition-all duration-300"
              onClick={handleNext}
            />
          </div>
          <div className="flex gap-2 overflow-scroll image-viewer-scroll">
            {images.map((image, index) => (
              <img
                src={image}
                className={`h-[100px] w-full object-contain cursor-pointer ${
                  selected === index ? "border-2 border-white" : ""
                }`}
                key={image + index}
                onClick={() => setSelected(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ImageViewer.displayName = "ImageViewer";

// Helper function to determine the grid class based on image count
const getClassName = (images) => {
  if (images.length > 4) return "md:grid-cols-4";
  if (images.length >= 2) return "md:grid-cols-3";
  return "grid-cols-1 p-2";
};

// Card component to render each image
const Card = memo(({ image = "", loading, preload }) => (
  <div
    className="h-full w-full"
    style={{ backgroundSize: "cover", backgroundPosition: "center" }}
  >
    {loading ? (
      <Skeleton height="100%" />
    ) : (
      <Image
        src={image}
        alt="Image"
        width={500} // Set a reasonable width for optimization
        height={500} // Set a reasonable height
        layout="responsive"
        priority={preload} // Preload main images to speed up loading
        className="w-full h-full object-cover"
        // sizes="(max-width: 768px) 100vw, 50vw" // Serve appropriate size based on viewport
      />
    )}
  </div>
));

Card.displayName = "Card";

export default ImageViewer;
