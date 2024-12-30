import { useRouter } from "next/navigation";

const WishListItems = () => {
  const router = useRouter();
  const wishListFolders = [
    {
      id: 1,
      name: "My Next Tour",
      savedItems: "4",
      savedImages: [
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
      ],
    },
    {
      id: 2,
      name: "My Next Tour",
      savedItems: "4",
      savedImages: [
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
      ],
    },
    {
      id: 3,
      name: "My Next Tour",
      savedItems: "2",
      savedImages: [
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
      ],
    },
    {
      id: 4,
      name: "My Next Tour",
      savedItems: "2",
      savedImages: [
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
        {
          img: "https://picsum.photos/200",
          name: "Holbrook, Arizona, US",
          location: "Calaca, Calabarzon, Philippines",
          date: "May 4 - 5",
          rating: "4.8 (230)",
          price: "95",
          time: "night",
          like: true,
        },
      ],
    },
  ];

  const handleWishListData = (item) => {
    router.push("/wishlist/" + item.id);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-start px-4 md:px-6 lg:px-24 xl:px-32 min-h-[90vh] py-[50px]">
        <p className="text-[#1F1C1E] font-medium leading-normal text-2xl mb-5">
          My Wishlist
        </p>
        <div className="flex gap-6 justify-start items-start flex-wrap">
          {wishListFolders.map((item) => (
            <div
              className="flex flex-col gap-3 justify-start items-start"
              onClick={() => handleWishListData(item)}
              key={item.id}
            >
              <div className="flex flex-col justify-center items-center rounded-3xl max-w-[350px]">
                <div className="flex justify-center items-center">
                  <div className="w-[50%] border border-white rounded-tl-3xl bg-[#D8D8D8]">
                    {
                      <img
                        src={
                          item.savedImages?.[0]?.img
                            ? item.savedImages[0]?.img
                            : "/empty-img.svg"
                        }
                        className="rounded-tl-3xl"
                      />
                    }
                  </div>
                  <div className="w-[50%] border border-white rounded-tr-3xl bg-[#D8D8D8]">
                    {
                      <img
                        src={
                          item.savedImages?.[1]?.img
                            ? item.savedImages[1]?.img
                            : "/empty-img.svg"
                        }
                        className="rounded-tr-3xl"
                      />
                    }
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-[50%] border border-white rounded-bl-3xl bg-[#D8D8D8]">
                    {
                      <img
                        src={
                          item.savedImages?.[2]?.img
                            ? item.savedImages[2]?.img
                            : "/empty-img.svg"
                        }
                        className="rounded-bl-3xl"
                      />
                    }
                  </div>
                  <div className="w-[50%] border border-white rounded-br-3xl bg-[#D8D8D8]">
                    {
                      <img
                        src={
                          item.savedImages?.[3]?.img
                            ? item.savedImages[3]?.img
                            : "/empty-img.svg"
                        }
                        className="rounded-br-3xl"
                      />
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-[#1F1C1E] font-medium leading-normal text-lg">
                  {item.name}
                </p>
                <p className="text-[#535052] leading-normal text-sm">
                  {item.savedItems} saved
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WishListItems;
