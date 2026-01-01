import axios from "axios";

export const publicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://inhouseshop.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
