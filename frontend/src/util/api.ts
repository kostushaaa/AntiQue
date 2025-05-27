// util/api.ts
import axios from "axios";

const { protocol, hostname } = window.location;
const baseURL = `${protocol}//${hostname}:9000`;

const api = axios.create({
    baseURL,
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
