function NotificationsSetting() {
  return (
    <>
      <div className="flex flex-col gap-6 justify-start items-start w-full">
        <p className="text-[#1F1C1E] text-2xl leading-normal font-medium">
          Social Accounts
        </p>
        <div className="flex justify-between gap-6 items-center pb-6 border-b border-[#E3E1E2] w-full flex-wrap">
          <div className="flex flex-col gap-2 justify-start items-start">
            <p className="text-[#1F1C1E] leading-normal text-base font-medium">
              Facebook
            </p>
            <p className="text-[#535052] text-base leading-normal">
              Not connected
            </p>
          </div>
          <p className="underline text-[#C75D9C] leading-nromal font-medium cursour-pointer">
            Connect
          </p>
        </div>
        <div className="flex justify-between gap-6 items-center w-full flex-wrap">
          <div className="flex flex-col gap-2 justify-start items-start">
            <p className="text-[#1F1C1E] leading-normal text-base font-medium">
              Google
            </p>
            <p className="text-[#535052] text-base leading-normal">Connected</p>
          </div>
          <p className="underline text-[#C75D9C] leading-nromal font-medium cursour-pointer">
            Disconnect
          </p>
        </div>
      </div>
    </>
  );
}

export default NotificationsSetting;
