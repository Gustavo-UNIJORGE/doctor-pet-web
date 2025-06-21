import axios from "axios";
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

const instance = axios.create({
  baseURL: "http://localhost:8000",
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN', 
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


const api = {
  getTasks: async () => {
    const response = await instance.get("/task/");
    return response.data;
  },
  createTask: async (data: Task) => {
    const response = await instance.post("/task/create/", data);
    return response.data;
  },
};

export default api;
