"use client";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useSocialLogin } from "@hooks/login";
import toast from "react-hot-toast";

import { useState } from "react";

import Modal from "../modal";
import Heading from "./authHeader";
import { auth } from "@/config/firebase";
import TextInput, { PhoneInput } from "../form/input";
import SocialButtons from "./socialButtons";
import Api from "@/api";
import { useAuth } from "@/hooks";
import useModals from "@/hooks/modal";
import { decodeError } from "@/utils";

function LoginContent({ open, onClose }) {
  const { signInwithEmail } = useSocialLogin();
  const { login } = useAuth();
  const { showOtpModal, setForget, setLogin, setRegister } = useModals();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [phone, setPhone] = useState("");
  const [throughPhone, setThroughPhone] = useState(false);

  const handleEmailSubmit = async (setCLoading) => {
    setCLoading(true);
    const res = await signInwithEmail(data);

    if (res.error) {
      console.log(res.error);
      toast.error(res.error);
      setCLoading(false);
      return;
    }

    const accessToken = res?.user?.accessToken;

    const res2 = await Api.login(
      {
        idToken: accessToken,
        email: res?.user?.email,
        uid: res?.user?.uid,
        password: res?.user?.uid,
      },
      setCLoading
    );

    if (res2?.error) {
      console.log(res2.error);
      toast.error(res2.error);
      setCLoading(false);
      return;
    }

    toast.success("Logged in successfully");

    setCLoading(false);
    login(res2?.data?.user, res2?.data?.token);

    onClose(false);

    // clearData();
  };

  const handlePhoneSubmit = async (setCLoading) => {
    if (!phone) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const res = await Api.checkPhone(
      {
        phone,
      },
      setCLoading
    );

    if (!res?.data) {
      toast.error("Phone number is not registered");
      setCLoading(false);
      return;
    }

    if (!window.recaptchaVerifier) {
      console.log("here");
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
      });
    }

    console.log(phone);

    setCLoading(true);
    await signInWithPhoneNumber(auth, "+" + phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        showOtpModal({
          phone,
          from: "login",
        });

        onClose(false);
        setCLoading(false);
        // setIsModalOpen(false);
        // setIsProfileModalOpen(true);
      })
      .catch((error) => {
        console.log("here 03");

        setCLoading(false);
        toast.error(decodeError(error.code));
      });

    // setIsModalOpen(false);
    // setPhone("");
  };

  const clearData = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal open={open} onClose={onClose} position="items-start">
      <div className="flex flex-col gap-6 p-5">
        <Heading />
        <div className="flex flex-col gap-6 pt-6 border-t border-[#EBEBEB]">
          {!throughPhone ? (
            <>
              <TextInput
                id="login-email"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
              />
              <TextInput
                id="login-password"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setLogin(false);
                    setForget(true);
                  }}
                >
                  <p className="text-[#747073] text-smleading-normal">
                    Forgot password?
                  </p>
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <PhoneInput
                  country={"eg"}
                  enableSearch={false}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                  className="w-full"
                />
              </div>
              <p className="text-[#747073] text-sm leading-normal">
                We’ll call or text you to confirm your number. Standard message
                and date rates apply.
              </p>
            </div>
          )}
          <SocialButtons
            type="login"
            onClose={onClose}
            setThroughPhone={setThroughPhone}
            throughPhone={throughPhone}
            handleEmailSubmit={handleEmailSubmit}
            handlePhoneSubmit={handlePhoneSubmit}
          />

          <div className="flex justify-center items-center">
            <p className="text-[#535052] text-base leading-normal">
              {" "}
              Don&apos;t have an account?{" "}
              <span
                onClick={() => {
                  onClose();
                  setRegister(true);
                }}
                className="underline text-[#C75D9C] cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default LoginContent;
