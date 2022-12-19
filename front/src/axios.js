import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8082'
    // baseURL: 'https://localhost:8443'
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('accessToken');
    return config;
});

export default instance;