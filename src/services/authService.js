import api from "./api";

export const authService = {
  login: (username, password) => {
    return api.post("/auth/login", { username, password });
  },
  register: (payload) => {
    return api.post("/auth/register", payload);
  },
};
