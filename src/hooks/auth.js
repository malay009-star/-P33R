import { AuthContext } from "@contexts/index";

import { useContext } from "react";

export default function useAuth() {
  const {
    isLoggedin,
    user,
    profile,
    token,
    logout,
    recaptchaVerifier,
    wishlist,
    toggleWishlist,
    login,
    getProfile,
    categories,
  } = useContext(AuthContext);

  return {
    isLoggedin,
    user,
    profile,
    token,
    logout,
    recaptchaVerifier,
    wishlist,
    toggleWishlist,
    login,
    getProfile,
    categories,
  };
}
