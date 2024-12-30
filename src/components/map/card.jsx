import Image from "next/image";
import React from "react";
import { IoStarSharp } from "react-icons/io5";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";

export const ListingCard = ({ listingData }) => {
  const { title, merchant_image_url, rating, price, isAffiliate, id } =
    listingData;
  const { wishlist, toggleWishlist } = useAuth();
  const router = useRouter();

  const inWishlist = wishlist.findIndex(
    (wsh) => id == (isAffiliate ? wsh.affiliate_product_id : wsh.product_id)
  );

  return (
    <div
      className="min-h-[220px] w-[250px] rounded-md flex flex-col"
      onClick={() => router.push(`/listing/${listingData?.id}`)}
    >
      <div className="flex gap-3 justify-end mb-[-40px] z-10 mr-1 pt-2">
        <button
          className="bg-[#fff] rounded-full p-[5px] text-xl"
          onClick={(e) => {
            e.stopPropagation();

            toggleWishlist({
              _id: id,
              is_affiliated: isAffiliate,
              product_id: id,
              affiliate_product_id: id,
            });
          }}
        >
          {inWishlist > -1 ? (
            <FaHeart className="text-[#D750A0]" />
          ) : (
            <FaRegHeart className="text-[#1F1C1E]" />
          )}
        </button>
      </div>
      <div className="h-[150px] w-full">
        <img
          src={merchant_image_url ? merchant_image_url : "/"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 h-[50px]">
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium">{title}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className="text m-0">${price}</p>{" "}
          <p className="flex gap-2 items-center m-0">
            <IoStarSharp className="text-[#FFB800]" />
            <p className="text-lg font-normal">
              {rating
                ? rating > 5
                  ? Number(rating / 20).toFixed(1)
                  : Number(rating).toFixed(1)
                : "N/A"}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};
