import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true, // send cookies if using cookie auth
  timeout: 15000,
});

// attach Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

// handle 401 globally (optional): clear token silently / redirect
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // avoid console spamming: only handle silently here
    if (error.response?.status === 401) {
      // clear client-side stored token if any
      localStorage.removeItem("token");
      // optionally broadcast event or redirect to login:
      // window.dispatchEvent(new Event('unauthorized'));
      return Promise.reject(error); // callers can catch and handle silently
    }
    return Promise.reject(error);
  }
);
