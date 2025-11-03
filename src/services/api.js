import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/users", // Spring Boot API base
  headers: { "Content-Type": "application/json" },
});

// Interceptor để attach token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
