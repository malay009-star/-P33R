import React, { useEffect, useState } from "react";
import TextInput, { PhoneInput } from "../form/input";
import Modal from "../modal";
import { ImageInput } from "../form/image";
import { getAvatar } from "@/utils/image";
import { useAuth } from "@/hooks";
import GradientButton from "../buttons";
import Api from "@/api";
import useApi from "@/hooks/useApi";
import toast from "react-hot-toast";

export default function ProfileModal({ open, onClose }) {
  const [avatar, setAvatar] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const { uploadImage } = useApi();

  const { profile, getProfile } = useAuth();
  console.log(profile);

  useEffect(() => {
    if (profile) {
      setData(profile);
    }
  }, [profile]);

  const updateProfile = async () => {
    let body = {
      firstname: data.firstname,
      lastname: data.lastname,
      // email: profile?.provider !== "phone" ? profile?.email : data.email,
      // phone: profile?.provider === "phone" ? profile?.phone : data.phone,
    };

    if (profile?.provider !== "phone") {
      body.phone = data.phone;
    }

    if (profile?.provider === "phone") {
      body.email = data.email;
    }

    if (avatar) {
      const res = await Api.uploadImage(avatar, setLoading);

      if (res?.status !== 200) {
        toast.error("Unable to upload profile image");
        return;
      }

      body.avatar = res?.image;
    }

    const resp = await Api.updateProfile(profile?.id, body, setLoading);
    if (!resp.error) {
      getProfile();
      toast.success("Profile updated successfully");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-8 flex flex-col gap-2 items-center">
        {/* Profile Modal Heading */}
        <div className="flex gap-6 justify-between items-center w-full">
          <p className="bg-gradient-to-r from-gradientBlue via-gradientLightBlue to-gradientPink bg-clip-text text-transparent text-center font-manrope text-2xl font-medium">
            Edit Profile Page
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center items-center">
          <ImageInput
            image={avatar}
            setImage={setAvatar}
            placeholder={getAvatar(profile?.avatar)}
          />
        </div>

        {/* Prodile Details */}
        <div className="flex flex-col gap-4 w-full">
          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full">
              <TextInput
                id="firstName"
                label="First name"
                type="text"
                autoComplete="text"
                value={data?.firstname}
                onChange={(e) =>
                  setData({ ...data, firstname: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <TextInput
                id="lastName"
                label="Last name"
                type="text"
                autoComplete="text"
                value={data?.lastname}
                onChange={(e) => setData({ ...data, lastname: e.target.value })}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <TextInput
              id="signUpemail"
              label="Email"
              type="email"
              autoComplete="email"
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled={profile?.provider !== "phone"}
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-2">
            <PhoneInput
              country={"eg"}
              enableSearch={false}
              value={data?.phone}
              onChange={(value) => setData({ ...data, phone: value })}
              disabled={profile?.provider === "phone"}
            />
          </div>

          <GradientButton
            text="Save"
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
