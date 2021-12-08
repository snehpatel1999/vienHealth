import axios from "axios";
import cookie from "./cookie";


export const Http = axios.create({
  timeout: 45000,
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


Http.interceptors.request.use((config) => {
  const { getCookie } = cookie()
  const url = config?.url?.split("/") || [];
  const unAuthRoutes = ["login","forgotten"];

  if (unAuthRoutes.filter((x) => url.includes(x)).length === 0) {
    const token = getCookie("token")

    if (token) {
      config.headers.common["x-access-token"] = token;
    }
  }

  return config;
});

Http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);


export default Http;