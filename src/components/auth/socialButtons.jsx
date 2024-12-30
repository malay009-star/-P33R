import { auth } from "@config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  OAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { decodeError } from "@/utils";
import GradientButton from "../buttons";
import toast from "react-hot-toast";
import Api from "@/api";
import { useAuth, useLoading } from "@/hooks/index";
import { useState } from "react";

function SocialButtons({
  type,
  onClose,
  setThroughPhone,
  throughPhone,
  passwordValidate,
  handleEmailSubmit,
  handlePhoneSubmit,
}) {
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");
  const { setLoading } = useLoading();
  const { login } = useAuth();
  const [cLoading, setCLoading] = useState(false);

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential.accessToken;
        const user = result.user;

        console.log(token);
        console.log(result?._tokenResponse);

        const tk = result?._tokenResponse;

        const res = await Api.socialLogin(
          {
            firstname: tk?.firstName,
            lastname: tk?.lastName,
            email: user.email,
            avatar: user.photoURL,
            uid: user.uid,
            google_id: user.uid,
            provider: "google",
          },
          setLoading
        );

        if (res?.error) return;

        login(res?.data?.user, res?.data?.token);

        onClose(false);
      })
      .catch((error) => {
        toast.error(decodeError(error.code));
      });
  };

  const handleFacebookLogin = async () => {
    signInWithPopup(auth, fbProvider)
      .then(async (result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        const tk = result?._tokenResponse;

        const res = await Api.socialLogin(
          {
            firstname: tk?.firstName || "P33R",
            lastname: tk?.lastName || "User",
            email: user.email,
            avatar: user.photoURL,
            uid: user.uid,
            provider: "facebook",
          },
          setLoading
        );

        if (res?.error) return;

        login(res?.data?.user, res?.data?.token);

        onClose(false);
      })
      .catch((error) => {
        toast.error(decodeError(error.code));
      });
  };

  const handleAppleLogin = async () => {
    signInWithPopup(auth, appleProvider)
      .then(async (result) => {
        const user = result.user;

        const credential = OAuthProvider.credentialFromResult(result);
        const accesssToken = credential.accessToken;
        const idToken = credential.idToken;

        const res = await Api.socialLogin(
          {
            firstname: "P33R",
            lastname: "User",
            email: user.email,
            avatar: user.photoURL,
            uid: user.uid,
            provider: "apple",
          },
          setLoading
        );

        if (res?.error) return;

        login(res?.data?.user, res?.data?.token);

        onClose(false);
      })
      .catch((error) => {
        toast.error(decodeError(error.code));
      });
  };

  const handleContinue = () => {
    if (type == "signup") {
      if (throughPhone) {
        handlePhoneSubmit(setCLoading);
      } else {
        handleEmailSubmit(setCLoading);
      }
    }
    if (type == "login") {
      if (throughPhone) {
        handlePhoneSubmit(setCLoading);
      } else {
        console.log("email");
        handleEmailSubmit(setCLoading);
      }
    }
  };

  return (
    <>
      {/* Continue Btn */}
      <GradientButton
        text="Continue"
        onClick={handleContinue}
        loading={cLoading}
      />

      {/* Social Media Logins */}
      <div className="flex gap-3  justify-center items-center">
        <hr className="w-[35%] text-[#EBEBEB]" />
        <p className="text-[#747073] font-manrope text-sm font-medium text-center">
          or continue with
        </p>
        <hr className="w-[35%] text-[#EBEBEB]" />
      </div>
      <div className="flex gap-4 justify-center items-center flex-wrap sm:flex-wrap lg:flex-nowrap">
        <div
          onClick={() => handleFacebookLogin()}
          className="flex gap-2 justify-center items-center cursor-pointer p-4 w-full md:w-[45%] xl:w-[25%] rounded-xl border border-[#E0E0E0] bg-white text-[#535052] text-sm leading-normal"
        >
          <img src="/assets/fb-icon.svg" />
          <p>Facebook</p>
        </div>
        <div
          onClick={() => handleGoogleLogin()}
          className="flex gap-2 justify-center items-center cursor-pointer p-4 w-full md:w-[45%] xl:w-[25%] rounded-xl border border-[#E0E0E0] bg-white text-[#535052] text-sm leading-normal"
        >
          <img src="/assets/google-icon.svg" />
          <p>Google</p>
        </div>
        <div
          onClick={() => handleAppleLogin()}
          className="flex gap-2 justify-center items-center cursor-pointer p-4 w-full md:w-[45%] xl:w-[25%] rounded-xl border border-[#E0E0E0] bg-white text-[#535052] text-sm leading-normal"
        >
          <img src="/assets/apple-icon.svg" />
          <p>Apple</p>
        </div>
        <div
          onClick={() => setThroughPhone(!throughPhone)}
          className="flex gap-2 justify-center items-center cursor-pointer p-4 w-full md:w-[45%] xl:w-[25%] rounded-xl border border-[#E0E0E0] bg-white text-[#535052] text-sm leading-normal"
        >
          <img
            src={
              throughPhone
                ? "/assets/login-email-icon.svg"
                : "/assets/phone-icon.svg"
            }
          />
          <p>{throughPhone ? "Email" : "Phone"}</p>
        </div>
      </div>
    </>
  );
}

export default SocialButtons;
