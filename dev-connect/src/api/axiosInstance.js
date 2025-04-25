import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/"
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