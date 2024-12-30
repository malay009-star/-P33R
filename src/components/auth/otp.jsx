import { useState, useRef } from "react";
import Modal from "../modal";
import TextInput, { OTPInput } from "../form/input";
import GradientButton from "../buttons";
import toast from "react-hot-toast";
import Api from "@/api";
import { useAuth } from "@/hooks";
import { decodeError } from "@/utils";
import useModals from "@/hooks/modal";

function OtpModal({ open, onClose, phoneData }) {
  const { login } = useAuth();

  const [data, setData] = useState({
    codeValue1: "",
    codeValue2: "",
    codeValue3: "",
    codeValue4: "",
    codeValue5: "",
    codeValue6: "",
  });

  // const inputs = Array.from({ length: 6 }, (_, index) => useRef(null));
  const inputs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [loading, setLoading] = useState(false);

  const handleFieldValueChange = (index, value) => {
    const currentInput = inputs[index];
    setData({ ...data, [`codeValue${index + 1}`]: value });

    if (value.length > 0) {
      const nextIndex = index + 1;
      nextIndex < 6
        ? inputs[nextIndex]?.current?.focus()
        : currentInput?.current?.blur();
    }
  };

  return (
    <Modal open={open} onClose={onClose} position="items-start">
      <div className="flex flex-col gap-12 py-5 px-2">
        <div className="flex flex-col gap-3 justify-center items-center pb-6 border-b border-[#EBEBEB]">
          <p className="bg-gradient-to-r from-gradientBlue from-10% via-gradientLightBlue via-30% to-gradientPink to-90% w-fit bg-clip-text text-transparent text-center font-manrope text-2xl font-bold">
            Phone Verification
          </p>
        </div>
        <div className={`flex flex-col gap-12`}>
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-[#1F1C1E] font-manrope text-xl font-bold leading-6">
                Confirm your phone
              </p>
              <p className="text-[#747073] font-manrope text-sm">
                Enter the 6-digit code PEER just sent to{" "}
                <span className="text-[#1F1C1E] font-bold">
                  +{phoneData?.phone}
                </span>
              </p>
            </div>
            <div className="flex gap-1 md:gap-6 max-w-[390px] justify-center items-center flex-wrap">
              {Array.from({ length: 6 }, (_, index) => (
                <OTPInput
                  key={index}
                  type="text"
                  validate={true}
                  fieldType="otp"
                  value={data[`codeValue${index + 1}`]}
                  onChange={(e) =>
                    handleFieldValueChange(index, e.target.value)
                  }
                  tref={inputs[index]}
                  extraClasses="no-padding"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-center items-center">
            <div className="w-[200px] sm:w-[300px]">
              <GradientButton
                text="Verify"
                className={"w-[280px]"}
                loading={loading}
                onClick={async () => {
                  const otp = Object.values(data).join("");
                  if (otp.length < 6) {
                    toast.error("Please enter a valid OTP");
                    return;
                  }

                  window.confirmationResult
                    .confirm(otp)
                    .then(async (result) => {
                      console.log(result);

                      const token = result.user.accessToken;

                      if (phoneData.from === "signup") {
                        const res2 = await Api.phoneSignup(
                          {
                            idToken: token,
                            firstname: phoneData?.firstname,
                            lastname: phoneData?.lastname,
                            phone: phoneData?.phone,
                            uid: result.user.uid,
                            password: result.user.uid,
                          },
                          setLoading
                        );

                        console.log(res2);

                        if (res2?.error) {
                          toast.error(res2.error);
                          return;
                        }

                        login(res2?.data?.user, res2?.data?.token);

                        onClose(false);

                        return;
                      }

                      const res = await Api.login(
                        {
                          idToken: token,

                          phone: phoneData?.phone,
                          uid: result.user.uid,
                        },
                        setLoading
                      );

                      if (res?.error) {
                        toast.error(res.error);
                        return;
                      }

                      if (!res?.success) {
                        toast.error(res.message);
                        return;
                      }

                      console.log(res);

                      login(res?.data?.user, res?.data?.token);

                      onClose(false);

                      //   console.log(result);
                      //   setIsModalOpen(false);
                      //   setIsProfileModalOpen(false);
                      //   clearData();
                    })
                    .catch((error) => {
                      toast.error(decodeError(error.message));
                    });
                }}
              />
            </div>
            <p className="text-[#747073] font-manrope text-sm">
              Didn’t get a text?{" "}
              <span className="text-[#1F1C1E] underline font-bold cursor-pointer">
                Send again
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OtpModal;
