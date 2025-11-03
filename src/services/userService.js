import api from "./api";

export const userService = {
  getAll: () => api.get("/users"),
  toggleStatus: (id) => api.patch(`/users/${id}/status`),
};
