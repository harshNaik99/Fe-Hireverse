// src/api/axiosInstance.ts
import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "../utils/tokenManager";
import { useAuthStore } from "../context/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

let isRefreshing = false;
let failedRequestsQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedRequestsQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedRequestsQueue = [];
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/refresh-token`,
        {},
        { withCredentials: true }
      );

      const newToken = refreshRes.data.accessToken;
      const user = refreshRes.data.user;

      // Update token and user
      setAccessToken(newToken);
      useAuthStore.getState().setUser(user);

      processQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);

    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAccessToken();
      useAuthStore.getState().clearUser();
      
      window.location.href = "/auth/login";
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// Helper function
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/user/refresh-token`,
      {},
      { withCredentials: true }
    );

    const { accessToken, user } = response.data;
    
    setAccessToken(accessToken);
    useAuthStore.getState().setUser(user);

    return { user, accessToken };
  } catch (error) {
    clearAccessToken();
    useAuthStore.getState().clearUser();
    throw error;
  }
};

export default api;