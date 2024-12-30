function AuthHeader() {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="bg-gradient-to-r from-gradientBlue from-10% via-gradientLightBlue via-30% to-gradientPink to-90% w-fit bg-clip-text text-transparent text-center font-manrope text-[24px] font-bold">
          Log in or Sign up
        </p>
        <p className="text-[#747073] font-manrope text-base">Welcome to PEER</p>
      </div>
    </>
  );
}

export default AuthHeader;
