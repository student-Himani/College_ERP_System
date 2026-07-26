import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenService";

const API_BASE = process.env.REACT_APP_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send/receive HttpOnly refresh cookie
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        axios
          .post(`${API_BASE}/auth/refresh`, null, { withCredentials: true })
          .then((response) => {
            const { accessToken } = response.data;
            setAccessToken(accessToken);
            api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            clearAccessToken();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(err);
  }
);

export default api;
