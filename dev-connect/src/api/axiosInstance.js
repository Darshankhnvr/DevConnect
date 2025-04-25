import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://devconnect-hcf2.onrender.com/api"
});

// Fix: Attach interceptor to axiosInstance, not axios
axiosInstance.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});



export default axiosInstance;