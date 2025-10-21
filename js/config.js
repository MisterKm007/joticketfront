/**
 * Backend base URL (Fly.io)
 */
export const BASE_URL = "https://backend-divine-haze-4499.fly.dev";

/**
 * Centralize endpoint paths
 */
export const ENDPOINTS = {
  register: "/auth/register",
  login: "/auth/login",
  createBillet: "/billets/", // POST
  protected: "/billets/protected", // GET (test token)
};
/**
 * Token storage key
 */
export const ACCESS_TOKEN_KEY = "jo_access_token";