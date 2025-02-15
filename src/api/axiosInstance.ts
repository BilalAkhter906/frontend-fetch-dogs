import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // 🔹 Ensures auth cookies are sent
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Debugging Axios Requests
axiosInstance.interceptors.request.use((config) => {
    console.log("📡 Sending API Request:", config.url);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("✅ API Response:", response);
        return response;
    },
    (error) => {
        console.error("❌ API Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;