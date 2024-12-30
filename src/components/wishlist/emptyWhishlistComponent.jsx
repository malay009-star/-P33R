const EmptyWhishlist = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-8 h-[90vh] bg-slate-100 pt-[103px]">
        <img src="/assets/emptyWishlistImg.svg" />
        <div className="flex justify-center items-center flex-col gap-3">
          <p className="text-[#1F1C1E] text-2xl font-medium text-center leading-normal">
            Wishlist is empty
          </p>
          <p className="text-[#747073] text-md leading-normal text-center max-w-[418px]">
            As you search, click the heart icon to save your favourite places
            and Experiences to a Wishlist
          </p>
        </div>
      </div>
    </>
  );
};

export default EmptyWhishlist;
