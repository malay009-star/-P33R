"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSocialLogin } from "@hooks/login";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { useState } from "react";

import { auth } from "@/config/firebase";
import { decodeError } from "@/utils";
import AuthHeader from "./authHeader";
import TextInput, { PhoneInput } from "../form/input";
import SocialButtons from "./socialButtons";
import Modal from "../modal";
import Api from "@/api";
import { useAuth, useLoading } from "@/hooks";
import useModals from "@/hooks/modal";

function SignUpContent({ open, onClose }) {
  const { signUpwithEmail, recaptchaVerifier } = useSocialLogin();
  const { showOtpModal } = useModals();
  const { login } = useAuth();

  const { setLogin } = useModals();

  const { setLoading } = useLoading();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    policies: false,
  });

  const [throughPhone, setThroughPhone] = useState(false);

  const eightCharacterPassword = data.password.length >= 8;
  const containSymOrNum = /[!@#$%^&*(),.?":{}|<>]/.test(data.password);
  const notNameAndEmail =
    data.password &&
    !data.password.includes(data.firstName) &&
    !data.password.includes(data.lastName);

  const handleEmailSubmit = async (setCLoading) => {
    if (!eightCharacterPassword || !containSymOrNum || !notNameAndEmail) {
      toast.error("Please enter a valid password");
      return;
    }
    if (!data.policies) {
      toast.error("Please accept the policies");
      return;
    }

    setCLoading(true);
    const res = await signUpwithEmail(data, setLoading);

    if (res.error) {
      console.log(res.error);
      toast.error(res.error);
      setCLoading(false);
      return;
    }

    const uid = res?.user?.user?.uid;

    const res2 = await Api.emailSignup(
      {
        ...data,
        firstname: data.firstName,
        lastname: data.lastName,
        phone: "",
        uid: uid,
      },
      setLoading
    );

    if (res2?.error) {
      console.log(res2.error);
      toast.error(res2.error);
      setCLoading(false);
      return;
    }

    login(res2?.data?.user, res2?.data?.token);

    setCLoading(false);

    onClose();
  };

  const handlePhoneSubmit = async (setCLoading) => {
    // if (!eightCharacterPassword || !containSymOrNum || !notNameAndEmail) {
    //   toast.error("Please enter a valid password");
    //   return;
    // }

    if (!data.policies) {
      toast.error("Please accept the policies");
      return;
    }

    setCLoading(true);

    // const res = await Api.phoneSignup(data, setCLoading);

    // if (res?.error) {
    //   setCLoading(false);
    //   return;
    // }

    setCLoading(true);

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
      });
    }

    console.log(data.phone);

    try {
      const res2 = await signInWithPhoneNumber(
        auth,
        "+" + data.phone,
        window.recaptchaVerifier
      );

      window.confirmationResult = res2;

      console.log("otp send");

      showOtpModal({
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        from: "signup",
      });
      onClose();

      console.log(res2);
      setCLoading(false);
    } catch (error) {
      setCLoading(false);
      toast.error(error.code);
      // toast.error(decodeError(error.code));
    }
  };
  return (
    <Modal open={open} onClose={onClose} position={"items-start"}>
      <div className="flex flex-col gap-6 p-5">
        <AuthHeader />
        <div className="flex flex-col gap-6 pt-6 border-t border-[#EBEBEB]">
          {/* Sign Up Content */}
          <div className="flex flex-col gap-8">
            {/* Nname Fields */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-5">
                <div className="flex-1">
                  <TextInput
                    id="signup-firstName"
                    label="First name"
                    type="text"
                    value={data.firstName}
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    id="signup-lastName"
                    label="Last name"
                    type="text"
                    value={data.lastName}
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <p className="text-[#747073] font-manrope text-[14px]">
                Make sure it matches the name on your government ID.
              </p>
            </div>

            {/* Sign up Email */}
            {!throughPhone ? (
              <div className="flex flex-col gap-2">
                <TextInput
                  id="signup-email"
                  label="Email"
                  type="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  auto
                />
                <p className="text-[#747073] font-manrope text-[14px]">
                  We’ll email you trip confirmations and receipts.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <PhoneInput
                  country={"eg"}
                  enableSearch={false}
                  value={data.phone}
                  onChange={(phone) => setData({ ...data, phone: phone })}
                  className="w-full"
                />
                <p className="text-[#747073] text-sm leading-normal">
                  We’ll call or text you to confirm your number. Standard
                  message and date rates apply.
                </p>
              </div>
            )}

            {/* Password Field */}
            {!throughPhone && (
              <div className="flex flex-col gap-3">
                <TextInput
                  id="signup-password"
                  label="Password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  autoComplete="new-password"
                />
                <div className="flex flex-col gap-[2px]">
                  <div className="flex gap-1 items-center">
                    <img
                      src={
                        eightCharacterPassword
                          ? "/assets/green-tick.svg"
                          : "/assets/red-cross.svg"
                      }
                      alt="_icon"
                    />
                    <p
                      className={`${
                        eightCharacterPassword
                          ? "text-[#3A7E25]"
                          : "text-[#BD2D19]"
                      } font-manrope text-[12px]`}
                    >
                      Password strength: weak
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src={
                        notNameAndEmail
                          ? "/assets/green-tick.svg"
                          : "/assets/red-cross.svg"
                      }
                      alt="_icon"
                    />
                    <p
                      className={`${
                        notNameAndEmail ? "text-[#3A7E25]" : "text-[#BD2D19]"
                      } font-manrope text-[12px]`}
                    >
                      Can’t contain your name or email address
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src={
                        eightCharacterPassword
                          ? "/assets/green-tick.svg"
                          : "/assets/red-cross.svg"
                      }
                      alt="_icon"
                    />
                    <p
                      className={`${
                        eightCharacterPassword
                          ? "text-[#3A7E25]"
                          : "text-[#BD2D19]"
                      } font-manrope text-[12px]`}
                    >
                      At least 8 characters
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <img
                      src={
                        containSymOrNum
                          ? "/assets/green-tick.svg"
                          : "/assets/red-cross.svg"
                      }
                      alt="_icon"
                    />
                    <p
                      className={`${
                        containSymOrNum ? "text-[#3A7E25]" : "text-[#BD2D19]"
                      } font-manrope text-[12px]`}
                    >
                      Contains a number and symbol
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-start items-start">
            <input
              className="mt-2"
              type="checkbox"
              id="signup-policies"
              name="policies"
              value={data.policies}
              onChange={(e) => setData({ ...data, policies: !data.policies })}
            />
            <p className="text-[#747073] font-manrope text-[14px]">
              By selecting{" "}
              <span className="text-[#747073] font-bold">
                Agree and continue
              </span>
              , I agree to PEER’s{" "}
              <Link
                href="/termsOfServices"
                rel="noopener noreferrer"
                target="_blank"
              >
                {" "}
                <span className="text-[#2E4F9E] font-bold cursor-pointer">
                  Terms of service, Payments Terms of Service
                </span>{" "}
              </Link>
              , and{" "}
              <Link
                href="/privacyPolicy"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2E4F9E] font-bold cursor-pointer">
                  Nondiscrimination Policy
                </span>
              </Link>
              , and acknowledge the{" "}
              <Link
                href="/privacyPolicy"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-[#2E4F9E] font-bold cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
            </p>
          </div>
          <SocialButtons
            type="signup"
            onClose={onClose}
            setThroughPhone={setThroughPhone}
            throughPhone={throughPhone}
            handleEmailSubmit={handleEmailSubmit}
            handlePhoneSubmit={handlePhoneSubmit}
          />
          <div className="flex justify-center items-center">
            <p className="text-[#535052] text-base leading-normal">
              {" "}
              Already have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  setLogin(true);
                }}
                className="underline text-[#C75D9C] cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpContent;
