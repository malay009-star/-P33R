import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@config/firebase";
import { decodeError } from "@/utils";

export function useSocialLogin() {
  const loginCheck = async (user, setLoading) => {};

  const signUpwithEmail = async ({ email, password }, setLoading) => {
    if (setLoading) setLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      return {
        status: 200,
        message: "Account Created",
        user: user,
      };
    } catch (error) {
      return {
        status: 400,
        error: decodeError(error.code),
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const signInwithEmail = async ({ email, password }, setLoading) => {
    if (setLoading) setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      return {
        status: 200,
        message: "Login Success",
        ...res,
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        error: decodeError(error.code),
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const forgetPassword = async (email, setLoading, redirect) => {
    if (setLoading) setLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        if (redirect) redirect();
        console.log("Password Reset Email Sent");
        return {
          status: 200,
          message: "Password Reset Email Sent",
        };
      })
      .catch((error) => {
        console.log(error);
        return {
          status: 400,
          message: decodeError(error.code),
        };
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };

  return {
    signUpwithEmail,
    signInwithEmail,
    forgetPassword,
    loginCheck,
  };
}
