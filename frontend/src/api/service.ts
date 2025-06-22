import axios, { type AxiosResponse } from "axios";
// import { API_BASE_URL } from "./config";
import type { Task } from "./models";

/* function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken"); */

export function toTask(data): Task {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    specialty: data.specialty,
    estimated_time: data.estimated_time,
    is_it_home: data.is_it_home,
  };
}

const instance = axios.create({
  baseURL: "http://localhost:8000",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = {
  getTasks: async () => {
    const response = await instance.get("/task/");
    const tasks = response.data.map(toTask);
    return tasks as Task[];
  },
  findTask: async (id: number) => {
    const response = await instance.get(`/task/${id}/`);
    const task = toTask(response.data);
    return task;
  },
  createTask: async (data: Task) => {
    const response = await instance.post("/task/create/", data);
    return response.data;
  },
  updateTask: async (id: number, data: Task) => {
    const response = await instance.put(`/task/${id}/edit`, data);
    return response.data;
  },
};

export default api;
