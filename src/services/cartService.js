import api from "./api";

export const cartService = {
  getByUser: (userId) => api.get(`/shopping_cart/user/${userId}`),
  addItem: (payload) => api.post("/shopping_cart", payload),
  updateQuantity: (cartId, qty) =>
    api.patch(`/shopping_cart/${cartId}`, { quantity: qty }),
  removeItem: (cartId) => api.delete(`/shopping_cart/${cartId}`),
  clearCartByUser: (userId) => api.delete(`/shopping_cart/user/${userId}`),
};
