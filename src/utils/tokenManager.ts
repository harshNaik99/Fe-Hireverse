// src/utils/tokenManager.ts
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  console.log("🟡 setAccessToken called with:", token);
  accessToken = token;
};

export const getAccessToken = (): string | null => {
  return accessToken;
};

export const clearAccessToken = () => {
  console.log("🟡 clearAccessToken called");
  accessToken = null;
};