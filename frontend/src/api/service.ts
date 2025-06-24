import axios from "axios";
// import { API_BASE_URL } from "./config";
import type { Task } from "./models";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function toTask(data): Task {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    specialty: data.specialty,
    estimated_time: data.estimated_time,
    is_it_home: data.is_it_home,
    is_active: data.is_active,
  };
}

const api = {
  getTasks: async () => {
    const response = await instance.get("/task/");
    const tasks: Task[] = response.data.map(toTask);

    return tasks as Task[];
  },
  getActiveTasks: async () => {
    const response = await instance.get("/task/");
    const tasks: Task[] = response.data.map(toTask);
    const activeTasks = tasks.filter((task) => task.is_active)
    
    return activeTasks as Task[];
  },
  findTask: async (id: number) => {
    const response = await instance.get(`/task/${id}/`);
    const task = toTask(response.data);
    return task;
  },
  searchTask: async (query: string) => {
    const searchedTitle = query.normalize().trim().toLowerCase();

    const response = await instance.get("/task");
    const tasks: Task[] = response.data.map(toTask);
    const filteredTasks = tasks.filter((task) => 
      task.title.normalize().trim().toLowerCase().includes(searchedTitle))

    return filteredTasks;
  },
  createTask: async (data: Task) => {
    const response = await instance.post("/task/create/", data);
    return response.data;
  },
  updateTask: async (id: number, data: Task) => {
    const response = await instance.put(`/task/${id}/edit`, data);
    return response.data;
  },
  deActiveTask: async (id: number, data: Task) => {
    data.is_active = false;
    const response = await instance.put(`/task/${id}/edit`, data);
    return response.data;
  },
};

export default api;
