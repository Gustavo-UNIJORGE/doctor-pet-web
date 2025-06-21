const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "login",
    REGISTER: "register",
    PROFILE: "profile",
    USERS: 'users'
  },
  TASKS: {
    LIST: "task",
    DETAIL: "task/:id",
    CREATE: "task/create",
  },
  ATTENDANCES: "attendance",
};
export default ROUTES;
