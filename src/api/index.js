import axios from "axios";
import toast from "react-hot-toast";

import "../config/axios";

export default class Api {
  // media upload
  static uploadImage = async (file, setLoading) => {
    if (setLoading) setLoading(true);
    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await axios.post("/upload-single-file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        status: 200,
        message: response.data.message,
        image: response.data.file_url,
      };
    } catch (error) {
      if (setLoading) setLoading(false);
      return {
        status: 400,
        message: error?.response?.data?.message || error.message,
      };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // Auth
  static sendEmail = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`send-mail`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static contactUs = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`contact-us`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static socialLogin = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`social-auth`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static emailSignup = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`email-signup`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static checkPhone = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`users/check-phone`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static phoneSignup = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`phone-signup`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static signup = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`register`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static login = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`login`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static phoneCheck = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`users/check-phone`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static forgetPassword = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`auth/admin-forgot-password`, data);
      toast.success("Reset password link sent to your email");
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static resetPassword = async (data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`auth/admin-reset-password`, data);
      toast.success("Password reset successfully");
      return res?.data;
    } catch (error) {
      toast.error("Invalid or expired token");
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getProfile = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`profile`);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static updateProfile = async (id, data, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.put(`users/${id}`, data);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // wishlist
  static getWishlist = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`wishlist`);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static toggleWishlist = async (body, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`wishlist`, body);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getWishlistProducts = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`wishlist/products/details`);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // listing
  static getListings = async (body, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`products/search`, body);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static searchListings = async (query = "", body, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.post(`products/search${query}`, body);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static searchExtListings = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`listing/get-external`);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  static getListing = async (id, setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`products/show/${id}`);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  // categoryy
  static getCategories = async (setLoading) => {
    try {
      if (setLoading) setLoading(true);
      const res = await axios.get(`product-categories`);
      return res?.data;
    } catch (error) {
      return { error: error?.response?.data?.message || error.message };
    } finally {
      if (setLoading) setLoading(false);
    }
  };
}

// import axios from "axios";
// import toast from "react-hot-toast";
// import _ from "lodash";

// // Base URL configuration
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://p33r-node.vercel.app/api";
// axios.defaults.baseURL = BASE_URL;
// axios.defaults.timeout = 10000; // 10 seconds timeout

// // Axios Interceptors
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const errorMessage = error?.response?.data?.message || error.message || "An error occurred";
//     return Promise.reject(errorMessage);
//   }
// );

// // Loading State Wrapper
// const handleLoading = async (fn, setLoading) => {
//   if (setLoading) setLoading(true);
//   try {
//     return await fn();
//   } finally {
//     if (setLoading) setLoading(false);
//   }
// };

// // API Class
// export default class Api {
//   // Media Upload
//   static uploadImage = async (file, setLoading, onUploadProgress) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     return handleLoading(
//       () =>
//         axios.post("/upload-single-file", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//           onUploadProgress: (progressEvent) => {
//             if (onUploadProgress) {
//               const percentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
//               onUploadProgress(percentage);
//             }
//           },
//         }).then((res) => ({
//           status: 200,
//           message: res.data.message,
//           image: res.data.file_url,
//         })),
//       setLoading
//     ).catch((error) => ({
//       status: 400,
//       message: error,
//     }));
//   };

//   // Authentication
//   static sendEmail = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/send-mail`, data).then((res) => res.data), setLoading);

//   static contactUs = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/contact-us`, data).then((res) => res.data), setLoading);

//   static socialLogin = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/social-auth`, data).then((res) => res.data), setLoading);

//   static emailSignup = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/email-signup`, data).then((res) => res.data), setLoading);

//   static checkPhone = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/users/check-phone`, data).then((res) => res.data), setLoading);

//   static phoneSignup = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/phone-signup`, data).then((res) => res.data), setLoading);

//   static signup = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/register`, data).then((res) => res.data), setLoading);

//   static login = async (data, setLoading) =>
//     handleLoading(() => axios.post(`/login`, data).then((res) => res.data), setLoading);

//   static phoneLogin = async (data, setLoading) =>
//     handleLoading(() =>
//       axios.post(`/auth/phone-login`, data).then((res) => res.data),
//       setLoading
//     );

//   static forgetPassword = async (data, setLoading) =>
//     handleLoading(() =>
//       axios.post(`/auth/admin-forgot-password`, data).then((res) => {
//         toast.success("Reset password link sent to your email");
//         return res.data;
//       }),
//       setLoading
//     );

//   static resetPassword = async (data, setLoading) =>
//     handleLoading(() =>
//       axios.post(`/auth/admin-reset-password`, data).then((res) => {
//         toast.success("Password reset successfully");
//         return res.data;
//       }),
//       setLoading
//     ).catch((error) => {
//       toast.error(error);
//       return { error };
//     });

//   static getProfile = async (setLoading) =>
//     handleLoading(() => axios.get(`/profile`).then((res) => res.data), setLoading);

//   static updateProfile = async (id, data, setLoading) =>
//     handleLoading(() => axios.put(`/users/${id}`, data).then((res) => res.data), setLoading);

//   // Wishlist
//   static getWishlist = async (setLoading) =>
//     handleLoading(() => axios.get(`/wishlist`).then((res) => res.data), setLoading);

//   static toggleWishlist = async (body, setLoading) =>
//     handleLoading(() => axios.post(`/wishlist`, body).then((res) => res.data), setLoading);

//   static getWishlistProducts = async (setLoading) =>
//     handleLoading(() => axios.get(`/wishlist/products/details`).then((res) => res.data), setLoading);

//   // Listings
//   static getListings = async (body, setLoading) =>
//     handleLoading(() => axios.post(`/products/search`, body).then((res) => res.data), setLoading);

//   static searchListings = _.debounce(async (query = "", body, setLoading) => {
//     return handleLoading(() => axios.post(`/products/search${query}`, body).then((res) => res.data), setLoading);
//   }, 300);

//   static searchExtListings = async (setLoading) =>
//     handleLoading(() => axios.get(`/listing/get-external`).then((res) => res.data), setLoading);

//   static getListing = async (id, setLoading) =>
//     handleLoading(() => axios.get(`/products/show/${id}`).then((res) => res.data), setLoading);

//   // Categories
//   static getCategories = async (setLoading) =>
//     handleLoading(() => axios.get(`/product-categories`).then((res) => res.data), setLoading);

//   // Batch Fetch Example
//   static fetchInitialData = async (setLoading) => {
//     return handleLoading(
//       () =>
//         Promise.all([
//           axios.get(`/product-categories`).then((res) => res.data),
//           axios.post(`/products/search`, {}).then((res) => res.data),
//         ]).then(([categories, listings]) => ({ categories, listings })),
//       setLoading
//     );
//   };
// }
