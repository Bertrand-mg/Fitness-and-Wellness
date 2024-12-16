import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:8080/api", // Replace with your backend URL
});

API.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");

  if (token) {
    token = token.replace(/^"|"$/g, ""); // Remove extra quotes
    req.headers.Authorization = `Bearer ${token}`;
    // console.log("Authorization Header Set:", req.headers.Authorization);
  } else {
    console.error("Token not found in localStorage");
  }

  // console.log("Final Request Headers:", req.headers);
  return req;
});

// Add the signup API call
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const validate2FA = (data) => API.post("/auth/validate-2fa", data);
export const sendResetLink = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (token, newPassword) =>
  API.post(`/auth/reset-password?token=${token}`, { newPassword });

//Admin access
export const userprofile = (email) =>
  API.get("/user/fetch-user", { params: { email: email } });
export const updateuserprofile = (data) => API.post("/user/update-user", data);

export const createtrainer = (data) => API.post("/admin/create-trainer", data);

export const createprogram = (data) => API.post("/admin/create-program", data);

export const fetchTrainer = (role) =>
  API.get("/admin/fetch-trainers", { params: { role: role } });

export default API;
