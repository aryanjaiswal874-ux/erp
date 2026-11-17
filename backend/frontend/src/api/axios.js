import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5577/api",
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("sbgm_user"));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
