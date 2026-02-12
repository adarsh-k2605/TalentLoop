import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;
// Use origin as baseURL so full paths like /api/sessions resolve correctly
const baseURL = apiUrl ? new URL(apiUrl.trim()).origin : undefined;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // by adding this field browser will send cookies to server automatically , on every request
})

export default axiosInstance;