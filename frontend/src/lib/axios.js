import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;
// Ensure baseURL ends with / so relative paths (e.g. "sessions") resolve correctly under /api
const baseURL = apiUrl?.replace(/\/?$/, "/");

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // by adding this field browser will send cookies to server automatically , on every request
})

export default axiosInstance;