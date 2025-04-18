import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dsa-sheet-tracker.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    Promise.resolve(error);
  }
);
