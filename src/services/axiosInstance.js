import axios from "axios";
import { API_URL } from "../config/config";
export const axiosInstance = axios.create({
    baseURL: API_URL || 'http://localhost:3001/api'
})

axios.defaults.maxHeaderSize = 50000;

axiosInstance.interceptors.request.use(
    config => {
        const token =  localStorage.getItem('access-token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}` 
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)