import axios from "axios";

const { protocol, hostname } = window.location;
const baseURL = `${protocol}//${hostname}:9000`;

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;
