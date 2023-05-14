import axios from "axios";

// baseURL: "http://localhost:5000/api",
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${localStorage.getItem("auth-token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
