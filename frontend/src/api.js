import axios from "axios";

const API = axios.create({
  baseURL: "https://bellcorp-eventhub-mahi.onrender.com/api",
  withCredentials: true,
});

API.interceptors.request.use(async config => {
  try {
    const isAuthenticated = await API.get("/user/me");
    const token = isAuthenticated.data.token;
    if (token) config.headers.Authorization = token;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
  return config;
});

export default API;
