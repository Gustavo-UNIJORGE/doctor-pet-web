import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchService = {
  getTasks: async () => {
    const response = await api.get("/task/");
    return response.data;
  },
  createTask: async (data) => {
    const response = await api.post("/task/", data);
    return response.data;
  },
};
