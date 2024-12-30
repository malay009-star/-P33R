import axios from "axios";
import toast from "react-hot-toast";

function getToken() {
  if (localStorage.getItem("token")) {
    const accessToken = localStorage.getItem("token") || "";
    return accessToken;
  }
  return "";
}

// axios.defaults.baseURL = "https://peer-beige.vercel.app/api";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + "api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    console.log("error");
    toast.error(error?.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    toast.error(error?.response?.data?.message || error.message);

    return Promise.reject(error);
  }
);

export default axios;
