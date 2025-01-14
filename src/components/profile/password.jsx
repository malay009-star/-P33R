import React, { useState } from "react";

import TextInput from "../form/input";
import Modal from "../modal";
import GradientButton from "../buttons";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { decodeError } from "@/utils";

export default function PasswordModal({ open, onClose }) {
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const eightCharacterPassword = data.newPassword.length >= 8;
  const containSymOrNum = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);
  const notNameAndEmail =
    !data.newPassword.includes(profile?.name) &&
    !data.newPassword.includes(profile?.email);

  const updateProfile = async () => {
    if (!data?.oldPassword || !data?.newPassword || !data?.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    const containSymOrNum = /[!@#$%^&*(),.?":{}|<>]/.test(data.newPassword);

    if (!containSymOrNum || data.newPassword.length < 8) {
      toast.error("Please enter a valid password");
      return;
    }

    if (data?.newPassword !== data?.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        profile?.email,
        data?.oldPassword
      );
      const res = await reauthenticateWithCredential(user, credential);

      await updatePassword(res.user, data?.newPassword);

      onClose();
    } catch (error) {
      toast.error(decodeError(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 flex flex-col gap-2 items-center">
        {/* Profile Modal Heading */}
        <div className="flex gap-6 justify-between items-center w-full">
          <p className="bg-gradient-to-r from-gradientBlue via-gradientLightBlue to-gradientPink bg-clip-text text-transparent text-center font-manrope text-2xl font-medium">
            Update Password
          </p>
        </div>

        {/* Prodile Details */}
        <div className="flex flex-col gap-4 w-full">
          {/* Name Fields */}
          <TextInput
            label="Enter old password"
            type="password"
            value={data?.oldPassword}
            onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
          />

          <TextInput
            label="Enter new password"
            type="password"
            value={data?.newPassword}
            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
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
                  eightCharacterPassword ? "text-[#3A7E25]" : "text-[#BD2D19]"
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
                  eightCharacterPassword ? "text-[#3A7E25]" : "text-[#BD2D19]"
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
                Contains a number or symbol
              </p>
            </div>
          </div>

          <TextInput
            label="Re-enter new password"
            type="password"
            value={data?.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />

          <GradientButton
            text="Update"
            onClick={updateProfile}
            loading={loading}
          />

          {/* Password Fields */}
          {/* <div className="flex flex-col md:flex-row gap-3">
            <TextInput id="password" label="Password" />
            <TextInput id="password" label="Password" />
          </div> */}
        </div>

        {/* Save button */}
        {/* <CommonButton
        buttonTxt="Save"
        roundedClass="rounded-full"
        paddingClasses="px-auto md:px-40 py-4"
        widthClasses="w-full"
        onClick={handleSaveClick}
      /> */}
      </div>
    </Modal>
  );
}
