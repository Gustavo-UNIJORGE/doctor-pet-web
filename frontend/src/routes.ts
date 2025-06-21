const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "login",
    REGISTER: "register",
    PROFILE: "profile",
    USERS: "users",
  },
  TASKS: {
    LIST: "task",
    CREATE: "task/create",
    DETAIL: "task/:id",
    EDIT: "task/:id/edit",
    DELETE: "task/:id/delete",
  },
  ATTENDANCES: "attendance",
};
export default ROUTES;
