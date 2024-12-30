"use client";
import { useState } from "react";
import UpdatePassword from "./updatePass";

function LoginSettings() {
  const [isUpdatePasswordContent, setIsUpdatePasswordContent] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-6 justify-start items-start w-full">
        <p className="text-[#1F1C1E] text-2xl font-medium leading-normal">
          Login
        </p>
        {!isUpdatePasswordContent && (
          <div className="flex gap-6 justify-between items-start w-full flex-wrap">
            <div className="flex flex-col gap-2 justify-start items-start">
              <p className="text-base font-medium text-[#1F1C1E] leading-normal">
                Password
              </p>
              <p className="text-base  text-[#535052] leading-normal">
                Last update 6 months ago
              </p>
            </div>
            <p
              onClick={() => setIsUpdatePasswordContent(true)}
              className="underline font-medium leading-normal text-[#C75D9C] text-base cursor-pointer"
            >
              Update
            </p>
          </div>
        )}
        {isUpdatePasswordContent && (
          <UpdatePassword
            setIsUpdatePasswordContent={setIsUpdatePasswordContent}
          />
        )}
      </div>
    </>
  );
}

export default LoginSettings;
