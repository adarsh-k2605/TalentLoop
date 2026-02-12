import axios from "axios";
import { getAuthTokenGetter } from "./authToken.js";

const apiUrl = import.meta.env.VITE_API_URL;
// Use origin as baseURL so full paths like /api/sessions resolve correctly
const baseURL = apiUrl ? new URL(apiUrl.trim()).origin : undefined;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Add Bearer token for cross-origin requests (cookies aren't sent across origins)
axiosInstance.interceptors.request.use(async (config) => {
  const getToken = getAuthTokenGetter();
  if (getToken) {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      // Ignore - backend will return 401 if auth is required
    }
  }
  return config;
});

export default axiosInstance;