"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { auth } from "@config/firebase";
import Api from "@/api";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const publicRoutes = [
    "/",
    "/search",
    "/search-external",
    "/impact-verification",
    "/contact-us",
    "/about-us",
    "/privacy-policy",
    "/terms-and-conditions",
    "/terms-of-use",
    "/waiver-agreement",
    "/end-user-agreement",
    "/copyright-policy",
    "/inquiry-form",
    "/blogs",
    "/blog-details",
    "/vendor",
  ];
  const isUserLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("token");

  const login = async (user, token) => {
    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }

    getProfile();
    getWishlistIds();
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setProfile(null);
        setToken(null);
        setIsLoggedIn(false);
        setWishlist([]);
        if (typeof window !== "undefined") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
        if (pathname.startsWith("/listing")) return;
        router.push("/");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      login(JSON.parse(user), token);
    }
  }, []);

  useEffect(() => {
    if (!isUserLoggedIn && !publicRoutes.includes(pathname)) {
      if (pathname.startsWith("/listing")) return;
      router.push("/");
    }
  }, [pathname, logout]);

  const toggleWishlist = async (product) => {
    if (!isLoggedIn) return toast.error("Please login to continue");

    const isExisting = wishlist.find(
      (item) =>
        product._id ==
        (product?.is_affiliated ? item.affiliate_product_id : item.product_id)
    );

    if (isExisting) {
      setWishlist(wishlist.filter((item) => item !== isExisting));
    } else {
      setWishlist([...wishlist, product]);
    }

    console.log(product);

    const res = await Api.toggleWishlist({ product_id: product._id });
    if (res?.error) return;
  };

  const getProfile = async () => {
    const res = await Api.getProfile();
    if (res?.error) {
      logout();
      return;
    }
    console.log(res?.data);
    setProfile(res?.data);
    // setWishlist(res?.data?.wishlist || []);
  };

  const getCategories = async () => {
    const res = await Api.getCategories();
    if (res?.error) return;
    setCategories(res?.data);
  };

  const getWishlistIds = async () => {
    const res = await Api.getWishlist();

    if (res?.error) return;

    setWishlist(res?.data);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: isLoggedIn,
        user,
        profile,
        token,
        logout,
        wishlist,
        toggleWishlist,
        login,
        getProfile,
        categories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
