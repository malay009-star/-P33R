"use client";

import { sendPasswordResetEmail } from "firebase/auth";
import { useSocialLogin } from "@hooks/login";

import { useState } from "react";

import Modal from "../modal";
import Heading from "./authHeader";
import TextInput, { PhoneInput } from "../form/input";
import useModals from "@/hooks/modal";
import GradientButton from "../buttons";
import { auth } from "@config/firebase";
import { decodeError } from "@/utils";
import toast from "react-hot-toast";

function ForgetPasswordContent({ open, onClose }) {
  const { forgetPassword } = useSocialLogin();

  const { showOtpModal, setLogin } = useModals();

  const [data, setData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = async () => {
    if (setLoading) setLoading(true);
    await sendPasswordResetEmail(auth, data.email)
      .then(() => {
        toast.success("Password Reset Email Sent");
        setLogin(true);
        onClose();
      })
      .catch((error) => {
        toast.error(decodeError(error.code));
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };

  return (
    <Modal open={open} onClose={onClose} position="items-start">
      <div className="flex flex-col gap-6 p-5">
        <Heading />
        <div className="flex flex-col gap-6 pt-6 border-t border-[#EBEBEB]">
          <>
            <TextInput
              id="login-email"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </>

          <GradientButton
            text="Forget Password"
            onClick={handleContinue}
            loading={loading}
          />

          <div className="flex justify-center items-center">
            <p className="text-[#535052] text-base leading-normal">
              <span
                onClick={() => {
                  onClose();
                  setLogin(true);
                }}
                className="underline text-[#C75D9C] cursor-pointer"
              >
                Back to login
              </span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ForgetPasswordContent;
