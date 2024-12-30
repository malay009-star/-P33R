import GradientButton from "../buttons";

function UpdatePassword({ setIsUpdatePasswordContent }) {
  return (
    <>
      <div className="flex flex-col gap-16 justify-center items-center w-full">
        <div className="flex flex-col gap-5 justify-center items-center w-full flex-wrap">
          <div className="flex justify-between items-center gap-6 flex-wrap w-full">
            <p className="text-base font-medium leading-normal tex-[#1F1C1E]">
              Password
            </p>
            <p
              onClick={() => setIsUpdatePasswordContent(false)}
              className="text-base font-medium leading-normal underline cursor-pointer text-[#C75D9C]"
            >
              Cancel
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-start items-start w-full flex-wrap">
            <p className="text-[#535052] text-base leading-normal">
              Current password
            </p>
            <input
              type="password"
              className="bg-[#F9F9F9] border border-[#CCCCCC] rounded-xl h-[58px] w-full"
            />
            <p className="text-[#C75D9C] text-base leading-normal underline cursor-pointer">
              Need a new password?
            </p>
          </div>
          <div className="flex flex-col gap-3 justify-start items-start w-full flex-wrap">
            <p className="text-[#535052] text-base leading-normal">
              New password
            </p>
            <input
              type="password"
              className="bg-[#F9F9F9] border border-[#CCCCCC] rounded-xl h-[58px] w-full"
            />
          </div>
          <div className="flex flex-col gap-3 justify-start items-start w-full flex-wrap">
            <p className="text-[#535052] text-base leading-normal">
              Confirm password
            </p>
            <input
              type="password"
              className="bg-[#F9F9F9] border border-[#CCCCCC] rounded-xl h-[58px] w-full"
            />
          </div>
        </div>
        <GradientButton text="Update Password" />
      </div>
    </>
  );
}

export default UpdatePassword;
