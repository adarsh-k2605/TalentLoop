import axios from "axios"

console.log("API URL:", import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials: true, // by adding this field browser will send cookies to server automatically , on every request
})

export default axiosInstance;