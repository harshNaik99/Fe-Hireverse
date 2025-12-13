// src/api/auth.api.ts
import api from "./axiosInstance";
import { useAuthStore } from "../context/authStore";
import { setAccessToken, clearAccessToken } from "../utils/tokenManager";

export const registerAPI = async (payload: any) => {
  const response = await api.post("/user/register", payload);
  return response.data.RESULT;
};

// Forgot Password
export const forgotPasswordAPI = async (payload: { email: string }) => {
  const response = await api.post("/user/forgotpassword", payload);
  // your backend structure: { RESULT: { MESSAGE, STATUS, ... } }
  return response.data.RESULT;
};

// Add this to src/api/auth.api.ts
export const resetPasswordAPI = async (payload: {
  email: string;
  token: string;
  newPassword: string;
}) => {
  const response = await api.post("/user/resetpassword", payload);
  return response.data.RESULT;
};



export const loginAPI = async (payload: any) => {
  const response = await api.post("/user/login", payload);
  const { user, accessToken } = response.data.RESULT;

  // Store token in memory
  setAccessToken(accessToken);
  // Store user in Zustand
  useAuthStore.getState().setUser(user);

  return { user, accessToken };
};



export const profileAPI = () => 
  api.get("/user/profile").then((r) => r.data.RESULT);

export const logoutAPI = async () => {
  const response = await api.post("/user/logout",
    {},
    { withCredentials: true }
  );
  
  // Clear everything
  clearAccessToken();
  useAuthStore.getState().clearUser();
  
  return response.data;
};