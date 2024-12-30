function SecuritySettings() {
  return (
    <>
      <div className="flex flex-col gap-10 justify-start items-start w-full">
        <div className="flex flex-col gap-6 justify-start items-start w-full flex-wrap">
          <p className="text-[#1F1C1E] text-2xl leading-normal font-medium">
            Account
          </p>
          <div className="flex gap-6 justify-between  items-center w-full flex-wrap">
            <p className="text-[#1F1C1E] text-base leading-normal">
              Deactivate your account
            </p>
            <p className="underline text-[#C75D9C] leading-nromal font-medium cursour-pointer">
              Deactivate
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 justify-start items-start w-full flex-wrap">
          <p className="text-[#1F1C1E] font-medium leading-normal text-2xl">
            Device History
          </p>
          <div className="flex gap-6 justify-between items-center w-full flex-wrap">
            <div className="flex gap-4 justify-start items-start">
              {/* <img src="/computer-icon.svg" /> */}
              <div className="flex flex-col gap-2 justify-start items-start">
                <p className="text-base leading-normal text-[#1F1C1E] ">
                  <p className="font-medium">OS X 10.15.7</p>{" "}
                  <span className="text-[#535052]"> Chrome</span>
                </p>
                <p className="text-[#535052] text-base leading-normal">
                  Taras, Rajshahi Division June 6, 2023 at 22:16
                </p>
              </div>
            </div>
            <p className="underline text-[#C75D9C] leading-nromal font-medium cursour-pointer">
              Log out device
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecuritySettings;
