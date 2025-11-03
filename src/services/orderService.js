import api from "./api";

export const orderService = {
  getAll: () => api.get("/orders"),
  create: (payload) => api.post("/orders", payload),
  changeStatus: (orderId, status) =>
    api.patch(`/orders/${orderId}/status`, { status }),
  getDetails: (orderId) => api.get(`/orders/${orderId}/details`),
};
